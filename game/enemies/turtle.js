class Turtle extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);

        this._myScale = [1.5 * STANDARD_DRAW_SCALE];
        this.moveAnimation = new Animation(game.AM.getAsset("./img/enemies/Turtle.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 1, y: 0}, 12, true, this._myScale);
        this.reloadAnimation = new Animation(game.AM.getAsset("./img/enemies/Turtle.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 8}, {x: 1, y: 38}, 12, false, this._myScale);
        this.attackAnimation = new Animation(game.AM.getAsset("./img/enemies/Turtle.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 1, y: 4}, 12, false, this._myScale);
        this.deathAnimation = new Animation(game.AM.getAsset("./img/enemies/Turtle.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 5}, {x: 1, y: 7}, 12, false, this._myScale);

        this.animation = this.moveAnimation;
        this.animation.unpause();

        this.speed = 50;
        this.radius = STANDARD_ENTITY_RADIUS * 0.5;
        this.reload();
        this.isAttacking = false;

        this.hp = 5;

        this.projectileAnimation = new Animation(game.AM.getAsset("./img/projectiles/Egg.png"), 5, 5,
            {x: 0, y: 0}, {x: 3, y: 0}, 4, true, this._myScale, 2);

    }

    update() {
        this._myScale[0] = 1.5 * STANDARD_DRAW_SCALE;
        if (this.isAttacking && this.animation.isDone()) {
            this.reload();
        } else if (this.reloading && this.animation.isDone()) {
            this.walk();
        } else if (!this.reloading && !this.isAttacking) {
            this.pathfind(1000, 50);
            let vecToPlayer = dirV(this, this.game._player);
            if (lengthV(vecToPlayer) > 75 ||
                (this.goalPoint.x === this.game.player.x &&
                this.goalPoint === this.game.player.y)) {

                if (this.goalPoint) {
                    this.go(normalizeV(dirV(this, this.goalPoint)));
                }
            } else {
                this.attack();
            }
        }
    }

    walk() {
        this.isAttacking = false;
        this.reloading = false;
        this.animation = this.moveAnimation;
        this.animation.resetAnimation();
        this.animation.unpause();
    }

    attack() {
        this.reloading = false;
        this.animation = this.attackAnimation;
        this.animation.resetAnimation();
        this.isAttacking = true;
        this.animation.unpause();

        for (let i = 0; i < 10; i++) {
            let r = Math.floor(Math.random() * 360);
            let attackVector = {x: Math.cos(r / 180 * Math.PI), y: Math.sin(r / 180 * Math.PI)};

            new Projectile(this.game,
                this.x, this.y + 6,
                attackVector,
                250, 2, true, this,
                this.projectileAnimation,
                1, 5, 2);
        }
    }

    reload() {
        this.isAttacking = false;
        this.animation = this.reloadAnimation;
        this.animation.resetAnimation();
        this.reloading = true;
        this.animation.unpause();
    }
}