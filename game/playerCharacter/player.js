const ACCELERATION = [15];//Higher = slidey'r
/**
 * @author Gordon McCreary, Joel Johnson, Gavin Montes
 * @param game, a reference to the game engine
 * @param characterClass, the class that the player has chosen (Lancer, Black Mage, etc.)
 * @constructor
 */
class Player extends Entity {
    constructor(game, characterClass, hp) {
        super(game, indexToCoordinate(game._sceneManager.level.spawn.x), indexToCoordinate(game._sceneManager.level.spawn.y));
        game._player = this;
        this.keys = 0;
        this.specialKeys = 0;
        this.characterClass = characterClass;
        this.direction = DIRECTION_RIGHT;
        this.animation = characterClass.animation.idleRight;
        this.animation.resetAnimation();
        this.animation.pause();
        this._collider = characterClass.collider;
        this.speed = characterClass.stats.speed;
        this.hp = hp;//characterClass.stats.maxHP;
        this.idleAnimation = this.animation;
        this.falling = false;

        this.attackCounter = 0;

        this.hearts = [
            new LastHeart(game,
                1.1 * STANDARD_ENTITY_FRAME_WIDTH / 2 * STANDARD_DRAW_SCALE,
                1.1 * STANDARD_ENTITY_FRAME_WIDTH / 2 * STANDARD_DRAW_SCALE)
        ];
        for (let i = 1; i < characterClass.stats.maxHP; i++) {
            this.hearts[i] = new Heart(game,
                (i + 1) * (1.1 * STANDARD_ENTITY_FRAME_WIDTH / 2 * STANDARD_DRAW_SCALE),
                1.1 * STANDARD_ENTITY_FRAME_WIDTH / 2 * STANDARD_DRAW_SCALE);
        }
        for (let i = 0; i < this.characterClass.stats.maxHP - this.hp; i++) {
            this.hearts[this.characterClass.stats.maxHP - i - 1].set(false);
        }
        this.hearts[0].set(true);

        this.velocity = {x: 0, y: 0};

        this.isTakingDmg = false;
        this.isAttacking = false;
        this.isIdling = false;

        this.screen = false;
        this.camLocked = false;
        this.addScale = 1;

        let that = this;

        //Will never be removed from world because it is looping
        this.idleTimer = new TimerCallback(this.game,
            5, true,
            function () {
                that.idle();
            });
        this.radius = STANDARD_ENTITY_RADIUS - 10;
        this.width = this.radius * 2;

        this.game.addEntity(this, LAYERS.MAIN);
        this.game.setPlayer(this);

        this.hurt = false;
        //this.hurt = true;
        this.invincible = false;

        this.progressBar = new ProgressBar(this.game, 0, this.animation._height * this.animation._scale/4, this.animation._frameWidth * this.animation._scale, this, 100 / this.characterClass.stats.specialChargeTime);

        this.dead = false;
		

    }


    draw() {
        if (this.game._camera.isOnScreen({x: this.x, y: this.y}, 100, 100, STANDARD_DRAW_SCALE)) {
            let screenPos = this.game._camera.drawPosTranslation({x: this.x, y: this.y}, 1);
            if (this.screen) {
                this.animation._screen = true;
            } else {
                this.animation._screen = false;
            }
            this.animation.drawFrame(this.game._clockTick, this.game._ctx, screenPos.x, screenPos.y, true, this.addScale);
        }
    }

    /**
     * Part of the game loop, update the player to the position and state it should now be in.
     */
    update() {

        if (this.falling) {
            let fVect = dirV({x: this.x, y: this.y}, {x: indexToCoordinate(coordinateToIndex(this.x)), y: indexToCoordinate(coordinateToIndex(this.y))});
            fVect = normalizeV(fVect);
            this.x += fVect.x * this.game._clockTick * this.characterClass.stats.speed / 2;
            this.y += fVect.y * this.game._clockTick * this.characterClass.stats.speed / 2;
            this.addScale -= this.game._clockTick * 3;
            if (this.addScale < 0) this.addScale = 0;
            return null;
        }

        for (let i = 0; i < this.characterClass.stats.maxHP; i++) {
            this.hearts[i].x = (i + 1) * (1.1 * STANDARD_ENTITY_FRAME_WIDTH * STANDARD_DRAW_SCALE);
            this.hearts[i].y = 1.1 * STANDARD_ENTITY_FRAME_WIDTH * STANDARD_DRAW_SCALE;
        }

        var that = this;
        //Testing collision with enemies
        this.game.entities[LAYERS.ENEMIES].forEach(function (elem) {
            if (circleToCircle(that, elem)) {
                //that.destroy(); // this was kinda awesome btw.
                let attackedFromVector = normalizeV(dirV({x: elem.x, y: elem.y}, {x: that.x, y: that.y}));
                var attackedFromDir = vectorToDir(attackedFromVector);
                that.takeDmg(1, attackedFromDir);
            }
        });

        //If x < 0 go back to character chooser
        if (this.x < 0) {
            this.game.game_state = GAME_STATES.CHARACTER_SELECT;
            this.game.addEntity(new NPC(this.game, this.characterClass, this.hp), LAYERS.MAIN);
            this.game.addEntity(new ChooseYourFighter(this.game), LAYERS.HUD);

            for (let i = 0; i < this.game.entities[LAYERS.HUD].length; i++) {
                if (this.game.entities[LAYERS.HUD][i] instanceof Tutorial) {
                    this.game.entities[LAYERS.HUD][i].destroy();
                }
            }
            if(this.removeFromWorld != true)
            {
              this.game.switchToCharacterChooserMode(this);
            }
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
                    if (this.game.rightClick) {
                        this.specialAttack();
                    } else {
                        this.regularAttack();
                    }
                }

                //If we were idle we aren't anymore, so reset the idle timer
                this.idleTimer.pause();
                this.idleTimer.reset();
                this.isIdling = false;
                this.animation.unpause();
            }
            // If game.change was not set, we have been idling
            else {
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
                this.idleAnimation = this.animation;

                /* If idle() has already been called and we are in the middle of
                playing the idle animation */
                if (this.isIdling) {

                    //If the animation is finished, reset to single frame and reset idleTimer
                    if (this.animation.isDone()) {
                        this.isIdling = false;
                        this.idleTimer.reset();
                        this.animation.resetAnimation();
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
            if (sessionStorage.getItem('fps') === '30') accelRate = Math.floor(accelRate * 1.8);
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

            let oldPos = {x: this.x, y: this.y};

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
            let newPos = this.game._sceneManager.level.move(this._collider, oldPos, {x: this.x, y: this.y});
            if (newPos === "pitfall") {
                this.pitfall({x: (oldPos.x - this.x) * 8 + oldPos.x, y: (oldPos.y - this.y) * 8 + oldPos.y});
            } else {
                this.x = newPos.x;
                this.y = newPos.y;
            }

            // Check if reached end of level.
            if (this.game.sceneManager.level.mapElementAt({
                x: coordinateToIndex(this.x),
                y: coordinateToIndex(this.y)
            }) === "E") {
                if (sessionStorage.getItem('level') !== 'endless') sessionStorage.setItem('level', "" + (eval(sessionStorage.getItem('level')) + 1));
                this.game.sceneManager.levelComplete();
            }
        }

        if (!this.camLocked && this.game.player.removeFromWorld === false) {
            let cOffX = this.game._camera._desiredLoc.x - this.x;
            let cOffY = this.game._camera._desiredLoc.y - this.y;
            while (Math.abs(cOffX) > CAMERA_BOUNDING_BOX) {
                if (cOffX > CAMERA_BOUNDING_BOX) {
                    this.game._camera._desiredLoc.x--;
                } else if (cOffX < CAMERA_BOUNDING_BOX) {
                    this.game._camera._desiredLoc.x++;
                }
                cOffX = this.game._camera._desiredLoc.x - this.x;
            }
            while (Math.abs(cOffY) > CAMERA_BOUNDING_BOX) {
                if (cOffY > CAMERA_BOUNDING_BOX) {
                    this.game._camera._desiredLoc.y--;
                } else if (cOffY < CAMERA_BOUNDING_BOX) {
                    this.game._camera._desiredLoc.y++
                }
                cOffY = this.game._camera._desiredLoc.y - this.y;
            }
        }
    }

    /**
     * Controls the idle animation of the player.
     * Runs every time the idle timer finishes.
     */
    idle() {
        this.animation.resetAnimation();
        this.animation.unpause();
        this.isIdling = true;
    }

    /**
     * Handles the player being hit. This will put them in the "taking damage" state and reduce their hp.
     * @param dmg the amount of damage they are taking, hp will be reduced by this amount
     * @param direction, the direction from which we were hit, so that the player can fly back from the impact.
     */
    takeDmg(dmg, direction) {
        if (this.hurt !== true && this.invincible !== true) {
            switch (direction) {
                case DIRECTION_LEFT:
                    this.animation = this.characterClass.animation.dmgFromRight;
                    break;
                case DIRECTION_RIGHT:
                    this.animation = this.characterClass.animation.dmgFromLeft;
                    break;
                case DIRECTION_UP:
                    this.animation = this.characterClass.animation.dmgFromDown;
                    break;
                case DIRECTION_DOWN:
                    this.animation = this.characterClass.animation.dmgFromUp;
            }
			
			this.animation.unpause();
			this.animation.resetAnimation();

            if (this.hp === 0) {
                this.dead = true;
                new PCRemnant(this.game, this.x, this.y, this.characterClass, this.animation);

                this.game.switchToCharacterChooserMode();
                this.destroy();
                return;
            } else if (this.hp === 1) {
                new TimerCallback(this.game, 7, false, function () {
					if(that.hp < 1)
					{
						that.hp = 1;
						that.hearts[0].set(true);
					}
                });
            }

            for (let i = 0; i < dmg; i++) {
                this.hearts[this.hp - i - 1].set(false);
            }
            this.hp -= dmg;
            this.isTakingDmg = true;

			this.animation.unpause();
			this.animation.resetAnimation();

            this.hurt = true;
            var that = this;

            new TimerCallback(this.game, 1, false, function () {
                that.isTakingDmg = false;
                //that.animation = that.idleAnimation;
                //that.animation.resetAnimation();
                that.screen = true;
            }); // stunned
            new TimerCallback(this.game, 3, false, function () {
                that.hurt = false;
                if(!that.invincible)
                  that.screen = false;
            });        // invincibility


            if (this.hp < 0) // If a player is on their last heart and take two damage, they should not die.
            {
                this.hp = 0;
            }
        }
    }

    heal(hp) {
        for (let i = hp; this.hp + 1 <= this.characterClass.stats.maxHP && i > 0; i--) {
            this.hearts[this.hp].set(true);
            this.hp += 1;
        }
    }

    destroy() {
        for (let i = 0; i < this.characterClass.stats.maxHP; i++) {
            this.hearts[i].destroy();
        }
        let i = 0;
        for (i = 0; i < this.keys; i++) {
            new Key(this.game, this.x + 10 * i, this.y + 10 * i);
        }
        let x = this.specialKeys + i;
        for (i; i < x; i++) {
            new SpecialKey(this.game, this.x + 10 * i, this.y + 10 * i);
        }

        if (this.game.game_state != GAME_STATES.CHANGING_LEVEL) {
            this.x = 0;
            this.y = this.game.sceneManager.level.spawn.y * 96;
        }

        this.progressBar.destroy();
        this.idleTimer.destroy();

        if (this.dead && this.game.entities[LAYERS.MAIN].length === 1) {
            this.game.gameOver();
        }
        super.destroy();
    }

    /**
     * Handles a regular attack (left click)
     */
    regularAttack() {

      this.game.click = false;
      this.isAttacking = true;

      let cursorCenter = this.game._camera.clickPosTranslation({x: this.game.mouseX, y: this.game.mouseY});
		
      let that = this;
		
	    //console.log(raycast({x: that.x, y: that.y}, cursorCenter, 20, function(pt) { return that.game._sceneManager.level.quickCollision(coordinateToIndex(pt.x), coordinateToIndex(pt.y)); }));

      let attackVector = normalizeV(dirV({x: this.x, y: this.y}, cursorCenter));

      var attackDir = vectorToDir(attackVector);

      switch (attackDir) {
          case DIRECTION_DOWN:
              this.animation = this.characterClass.animation.regAttackDown();
              break;
          case DIRECTION_UP:
              this.animation = this.characterClass.animation.regAttackUp();
              break;
          case DIRECTION_LEFT:
              this.animation = this.characterClass.animation.regAttackLeft();
              break;
          default:
              this.animation = this.characterClass.animation.regAttackRight();
              break;
      }

      this.animation.resetAnimation();
      this.animation.unpause();
      this.direction = attackDir;
      if (this.attackCounter < this.characterClass.stats.maxProjectiles) {
          this.attackCounter++;
          this.characterClass.attack(this, attackVector);
      }
    }

    specialAttack() {
        this.game.click = false;
        this.game.rightClick = false;

        this.isAttacking = true;
        let cursorCenter = this.game._camera.clickPosTranslation({x: this.game.mouseX, y: this.game.mouseY});

        let attackVector = normalizeV(dirV({x: this.x, y: this.y}, cursorCenter));

        var attackDir = vectorToDir(attackVector);

        switch (attackDir) {
            case DIRECTION_DOWN:
                this.animation = this.characterClass.animation.specialAttackDown();
                break;
            case DIRECTION_UP:
                this.animation = this.characterClass.animation.specialAttackUp();
                break;
            case DIRECTION_LEFT:
                this.animation = this.characterClass.animation.specialAttackLeft();
                break;
            default:
                this.animation = this.characterClass.animation.specialAttackRight();
                break;
        }

        this.animation.resetAnimation();
        this.animation.unpause();
        this.direction = attackDir;
        if (this.progressBar.progress === 100) {
            this.progressBar.progress = 0;
            this.progressBar.paused = true;
            this.characterClass.specialAttack(this, attackVector);
        } else if (this.characterClass instanceof Lancer) {
            this.isAttacking = false;
        }
    }

    pitfall(respawnPos) {
        this.speed = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.falling = respawnPos;
        let that = this;
        new TimerCallback(this.game, 3, false, function () {
            that.x = that.falling.x;
            that.y = that.falling.y;
            that.speed = that.characterClass.stats.speed;
            that.animation = that.characterClass.animation.idleRight;
            that.takeDmg(1, DIRECTION_UP);
            that.falling = false;
            that.addScale = 1;
        });
    }
}
