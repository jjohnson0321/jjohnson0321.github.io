class PuddleHopper extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        this.moveAnimation = new Animation(this.game.AM.getAsset("./img/enemies/PuddleHopper.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 2, y: 5}, 12, true, STANDARD_DRAW_SCALE);
        this.attackAnimation = null;
        this.deathAnimation = new Animation(this.game.AM.getAsset("./img/enemies/HopperDeath.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 4, y: 0}, 12, false, STANDARD_DRAW_SCALE);

        this.animation = this.moveAnimation;
        
        this.hp = 0.5

        this.speed = 300;
        this.radius = 1;
        this.directionSet = false;
        this.targetVector = null;
    }

    update() {
		if (!this.directionSet) {

			this.pathfind(1000, 50);
			this.directionSet = true;
		}

		if (this.goalPoint) {
			this.go(normalizeV(dirV(this, this.goalPoint)));
		}
    }
}

class LineHopper extends Enemy
{
  constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        this.moveAnimation = new Animation(this.game.AM.getAsset("./img/enemies/PuddleHopper.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 1, y: 2}, 12, true, STANDARD_DRAW_SCALE);
        this.attackAnimation = null;
        this.deathAnimation = new Animation(this.game.AM.getAsset("./img/enemies/HopperDeath.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 1}, 12, false, STANDARD_DRAW_SCALE);

        this.animation = this.moveAnimation;

        this.speed = 300;
        this.radius = 1;
        this.dir = {x: 1, y: 0};
        
        this.oldPos = {x: x, y: y};
    }
    
    update()
    {
       if (this.animation._elapsedTime < this.animation._totalTime * 6 / 14 ||
            this.animation._elapsedTime > this.animation._totalTime * 11 / 14)
            {
              this.x += this.dir.x * this.speed * this.game._clockTick;
              this.y += this.dir.y * this.speed * this.game._clockTick;
              let newPos = {x: this.x, y: this.y};
              if (this.wallCollision(newPos)) {
                  this.destroyWall();
              } else {
                  this.oldPos = newPos;
              }
            }
    }
    
    destroyWall() {
        this.game.player.progressBar.progress += this.game.player.characterClass.stats.specialChargeFromKill;
        this.spawner.spawn_timer.unpause();
        this.spawner.numOut--;
        this.spawner.spawn_timer.unpause();
        new PuddleRemnant(this.game, this.x, this.y, this.deathAnimation);
        this.removeFromWorld = true;
    }
}