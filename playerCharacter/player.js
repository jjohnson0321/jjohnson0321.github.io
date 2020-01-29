const ACCELERATION = [15];//Higher = slidey'r
/**
 * @author Gordon McCreary, Joel Johnson, Gavin Montes
 * @param game, a reference to the game engine
 * @param characterClass, the class that the player has chosen (Lancer, Black Mage, etc.)
 * @constructor
 */
class Player extends Entity
{
	constructor(game, characterClass) {
		super(game, 0, 128);
		game._player = this;
		this.characterClass = characterClass;
		this.direction = DIRECTION_RIGHT;
		this.animation = characterClass.animation.idleRight;
		this.animation.pause();

		this.speed = characterClass.stats.speed;
		this.hp = characterClass.stats.maxHP;
		this.velocity = {x: 0, y: 0};

		this.isTakingDmg = false;
		this.isAttacking = false;
		this.isIdling = false;
		
		let that = this;

		//Will never be removed from world because it is looping
		this.idleTimer = new TimerCallBack(this.game,
			5, true,
			function () {
				that.idle();
			});
		this.radius = STANDARD_ENTITY_RADIUS;
		this.width = this.radius * 2;
		
		this.game.addEntity(this, "main");
	}
	
	/**
	 * Part of the game loop, update the player to the position and state it should now be in.
	 */
	update()
	{
		//If x < 0 go back to character chooser
		if (this.x < 0) {
			this.game.game_state = GAME_STATES.CHARACTER_SELECT;
			this.game.camera.x = 0;
			this.game.camera.y = 0;
			this.game.addEntity(
				new NPC(this.game, this.characterClass), "main");
			this.destroy();
			return;
		}

		// // Are we (still) taking damage?
		// if (this.isTakingDmg) {
		//     if (this.animation.isDone()) {
		//         this.isTakingDmg = false;
		//     } else {
		//         //Continue direction (being thrown from the damage) SET VELOCITY ABOVE
		//
		//     }
		// }

		//If we are done taking damage, we are allowed to do other things
		if (!this.isTakingDmg) {
			// If we are done attacking, stop the attack animation
			if (this.isAttacking && this.animation.isDone()) {
				this.isAttacking = false;
			}
			//If we have received input we must be moving and/or attacking
			if (this.game.click || this.game.w || this.game.a || this.game.s || this.game.d || this.isAttacking) {
				//If we're moving
				if (this.game.keyStack.length > 0 && !this.isAttacking) {

					//Set animation to the walking animation
					if (this.game.lastKey === "KeyW" || this.game.lastKey === "ArrowUp") {
						this.direction = DIRECTION_UP;
						this.animation = this.characterClass.animation.walkingUp;
					} else if (this.game.lastKey === "KeyA" || this.game.lastKey === "ArrowLeft") {
						this.direction = DIRECTION_LEFT;
						this.animation = this.characterClass.animation.walkingLeft;
					} else if (this.game.lastKey === "KeyS" || this.game.lastKey === "ArrowDown") {
						this.direction = DIRECTION_DOWN;
						this.animation = this.characterClass.animation.walkingDown;
					} else if (this.game.lastKey === "KeyD" || this.game.lastKey === "ArrowRight") {
						this.direction = DIRECTION_RIGHT;
						this.animation = this.characterClass.animation.walkingRight;
					}
				}

				//Attack animation should supersede walking animation, so we can attack while moving
				if (this.game.click) {
					this.regularAttack();
				}

				//If we were idle we aren't anymore, so reset the idle timer
				this.idleTimer.pause();
				this.idleTimer.reset();
				this.isIdling = false;
				this.animation.unpause();
			}
			// If game.change was not set, we have been idling
			else  {
				//Make sure we're using the proper idle animation
				switch (this.direction) {
					case DIRECTION_RIGHT:
						this.animation = this.characterClass.animation.idleRight;
						break;
					case DIRECTION_DOWN:
						this.animation = this.characterClass.animation.idleDown;
						break;
					case DIRECTION_LEFT:
						this.animation = this.characterClass.animation.idleLeft;
						break;
					case DIRECTION_UP:
						this.animation = this.characterClass.animation.idleUp;
						break;
				}

				/* If idle() has already been called and we are in the middle of
				playing the idle animation */
				if (this.isIdling) {

					//If the animation is finished, reset to single frame and reset idleTimer
					if (this.animation.isDone()) {
						this.isIdling = false;
						this.idleTimer.reset();
						this.animation.pause();
					} else {
						//Idle animation should be playing
						this.animation.unpause();
						this.idleTimer.pause();
					}
				} else {
					//Make sure we continue ticking idle timer so we can get there.
					this.idleTimer.unpause();
					this.animation.pause();
				}
			}


			// Handle player movement.
			let accelRate = Math.floor(this.speed / ACCELERATION);
			while (Math.sqrt((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y)) > this.speed) {
				if (this.velocity.x > 0) {
					this.velocity.x = this.velocity.x - (Math.floor((Math.abs(this.velocity.x) / accelRate) / 2) * accelRate);
				} else if (this.velocity.x !== 0) {
					this.velocity.x = this.velocity.x + (Math.floor((Math.abs(this.velocity.x) / accelRate) / 2) * accelRate);
				}
				if (this.velocity.y > 0) {
					this.velocity.y = this.velocity.y - (Math.floor((Math.abs(this.velocity.y) / accelRate) / 2) * accelRate);
				} else if (this.velocity.y !== 0) {
					this.velocity.y = this.velocity.y + (Math.floor((Math.abs(this.velocity.y) / accelRate) / 2) * accelRate);
				}
			}
			if (this.game.w) {
				this.velocity.y = this.velocity.y - accelRate;
			} else if (this.velocity.y < 0) {
				this.velocity.y = this.velocity.y + accelRate;
			}
			if (this.game.a) {
				this.velocity.x = this.velocity.x - accelRate;
			} else if (this.velocity.x < 0) {
				this.velocity.x = this.velocity.x + accelRate;
			}
			if (this.game.s) {
				this.velocity.y = this.velocity.y + accelRate;
			} else if (this.velocity.y > 0) {
				this.velocity.y = this.velocity.y - accelRate;
			}
			if (this.game.d) {
				this.velocity.x = this.velocity.x + accelRate;
			} else if (this.velocity.x > 0) {
				this.velocity.x = this.velocity.x - accelRate;
			}

			if (this.velocity.x > 0) {
				this.x += Math.ceil(this.velocity.x * this.game._clockTick);
			} else {
				this.x += Math.floor(this.velocity.x * this.game._clockTick);
			}
			if (this.velocity.y > 0) {
				this.y += Math.ceil(this.velocity.y * this.game._clockTick);
			} else {
				this.y += Math.floor(this.velocity.y * this.game._clockTick);
			}
		}

		// //Enemies
		// this.game.entities[1].forEach(function (elem) {
		//     //If we're collided
		//     if (circleToCircle(this, elem)) {
		//         this.takeDmg(elem.dmg, elem.direction)
		//     }
		// });



		let cOffX = this.game._camera.x - this.x;
		let cOffY = this.game._camera.y - this.y;
		while (Math.abs(cOffX) > CAMERA_BOUNDING_BOX) {
			if (cOffX > CAMERA_BOUNDING_BOX) {
				this.game._camera.x--;
			} else if (cOffX < CAMERA_BOUNDING_BOX) {
				this.game._camera.x++;
			}
			cOffX = this.game._camera.x - this.x;
		}
		while (Math.abs(cOffY) > CAMERA_BOUNDING_BOX) {
			if (cOffY > CAMERA_BOUNDING_BOX) {
				this.game._camera.y--;
			} else if (cOffY < CAMERA_BOUNDING_BOX) {
				this.game._camera.y++
			}
			cOffY = this.game._camera.y - this.y;
		}
	}
	
	/**
	 * Controls the idle animation of the player.
	 * Runs every time the idle timer finishes.
	 */
	idle()
	{
		this.animation.resetAnimation();
		this.animation.unpause();
		this.isIdling = true;
	}
	
	/**
	 * Handles the player being hit. This will put them in the "taking damage" state and reduce their hp.
	 * @param dmg the amount of damage they are taking, hp will be reduced by this amount
	 * @param direction, the direction from which we were hit, so that the player can fly back from the impact.
	 */
	takeDmg(dmg, direction)
	{
		this.hp -= dmg;
		this.isTakingDmg = true;
		switch (direction) {
			case DIRECTION_LEFT:
				this.animation = this.characterClass.dmgFromRight;
				break;
			case DIRECTION_RIGHT:
				this.animation = this.characterClass.dmgFromLeft;
				break;
			case DIRECTION_UP:
				this.animation = this.characterClass.dmgFromDown;
				break;
			case DIRECTION_DOWN:
				this.animation = this.characterClass.dmgFromUp;
		}
	}
	/**
	 * Handles a regular attack (left click)
	 */
	regularAttack ()
	{
		this.isAttacking = true;
		this.game.click = false;
		let cursorCenter = this.game._camera.clickPosTranslation({x: this.game.mouseX, y: this.game.mouseY});

		let attackVector = normalizeV(dirV({x: this.x, y: this.y}, cursorCenter));

		var attackDir = vectorToDir(attackVector);
		var projectileAnimation = null;
		switch (attackDir) {
			case DIRECTION_DOWN:
				this.animation = this.characterClass.animation.regAttackDown;
				projectileAnimation = this.characterClass.animation.regProjectileDown;
				break;
			case DIRECTION_UP:
				this.animation = this.characterClass.animation.regAttackUp;
				projectileAnimation = this.characterClass.animation.regProjectileUp;
				break;
			case DIRECTION_LEFT:
				this.animation = this.characterClass.animation.regAttackLeft;
				projectileAnimation = this.characterClass.animation.regProjectileLeft;
				break;
			default:
				this.animation = this.characterClass.animation.regAttackRight;
				projectileAnimation = this.characterClass.animation.regProjectileRight;
				break;
		}
		this.animation.resetAnimation();
		this.animation.unpause();
		this.direction = attackDir;
		

		let projectile = new Projectile(this.game,
			this.x, this.y,
			attackVector,
			500, 0.5,
			this, projectileAnimation,
			1, 20); // slowed down projectile for debugging
		this.game.addEntity(projectile, "pps");
	}
}