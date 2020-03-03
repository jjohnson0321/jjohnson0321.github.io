class Snak extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        let spriteSheet = game.AM.getAsset("./img/enemies/SnakSheet.png");

        this.moveAnimation = new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            6, true, STANDARD_DRAW_SCALE);
        this.attackAnimation = new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 4, y: 0}, {x: 4, y: 1},
            10, false, STANDARD_DRAW_SCALE);
        this.deathAnimation = new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 1}, {x: 3, y: 2},
            16, false, STANDARD_DRAW_SCALE);

        this.projectileAnimation = new Animation(game.AM.getAsset("./img/projectiles/BallPulseBlue.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            10, true, STANDARD_DRAW_SCALE, 0.75);

        this.animation = this.moveAnimation;
        this.speed = 45;
        this.collider = new Collider(0, 0, -8, 14, -14, 13, null, 150);
        this.radius = STANDARD_ENTITY_RADIUS-10;
        
        this.hp = 2;
        
        let that = this;
        this.attackTimer = new TimerCallback(this.game, 1, false, function () {
            that.attack();
			this.attackTimer = new TimerCallback(this.game, 3, true, function () {that.attack()} );
        });
		
		this.projectileCount = 21;
    }

    update() {
        super.update();

        this.pathfind(1000, 50);
        if (this.goalPoint) {
            this.go(normalizeV(dirV(this, this.goalPoint)));
        }

        if (this.isAttacking) {
            if (this.animation.isDone()) {
                this.isAttacking = false;
                this.animation = this.moveAnimation;
                this.speed = 45;
				let rotate = 360 / this.projectileCount;
				let degreeToRadians = 2 * Math.PI / 360;
                for(let i = 0; i < this.projectileCount; i++)
				{
					new Projectile(this.game,
						this.x, this.y,
						normalizeV({x: Math.cos(i * rotate * degreeToRadians), y: Math.sin(i * rotate * degreeToRadians)}),
						100, 5, true,
						this,
						this.projectileAnimation, 1, 3, 10);
				}
            }
        }
    }

    attack() {
        this.isAttacking = true;
        this.animation = this.attackAnimation;
        this.animation.resetAnimation();
        this.animation.unpause();
        this.speed = 0;
    }
}