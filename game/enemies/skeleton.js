class Skeleton extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        this._myScale = [1.5 * STANDARD_DRAW_SCALE];

        this.moveAnimation = new Animation(game.AM.getAsset("./img/enemies/SkeletonWalk.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0}, 10, true, this._myScale);
        this.attackAnimation = new Animation(game.AM.getAsset("./img/enemies/SkeletonAttack.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0}, 10, false, this._myScale);
        this.deathAnimation = new Animation(game.AM.getAsset("./img/enemies/SkeletonDeath.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 8, y: 0}, 10, false, this._myScale);

        this.animation = this.moveAnimation;
        this.animation.unpause();

        this.speed = 75;
        this.radius = STANDARD_ENTITY_RADIUS * 0.5;
        this.isAttacking = false;

        this.hp = 3;

        this.projectileAnimation = new Animation(game.AM.getAsset("./img/projectiles/BoneProjectile.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0}, 10, true, this._myScale);

    }

    update() {
        this._myScale[0] = 1.5 * STANDARD_DRAW_SCALE;
        let vecToPlayer = dirV(this, this.game._player);
        let attackVector = normalizeV(vecToPlayer);

        if (this.isAttacking) {
            if (this.animation.isDone()) {

                new Projectile(this.game,
                    this.x, this.y,
                    attackVector,
                    200, 1.25, true, this,
                    this.projectileAnimation,
                    1, 2);

                this.animation.resetAnimation();
                this.animation.unpause();
            }
        } else {
            this.pathfind(1000, 50);
            if (lengthV(vecToPlayer) > 125 ||
                (this.goalPoint.x === this.game.player.x &&
                    this.goalPoint === this.game.player.y)) {

                if (this.waitTimer) {
                    this.waitTimer.destroy();
                    this.waitTimer = null;
                }
                if (this.attackTimer) {
                    this.attackTimer.destroy();
                    this.attackTimer = null;
                }
                if (this.goalPoint) {
                    this.go(normalizeV(dirV(this, this.goalPoint)));
                }
            } else if (!this.waitTimer) {
                this.attack();
            }
        }
    }

    attack() {
        this.animation = this.attackAnimation;
        this.animation.resetAnimation();
        this.isAttacking = true;
        this.animation.unpause();
        let that = this;

        //Attack repeatedly until this calls back
        this.attackTimer = new TimerCallback(this.game, 1.5, false, function () {
            that.isAttacking = false;
            that.animation = that.moveAnimation;
            that.animation.unpause();
            that.waitTimer = new TimerCallback(that.game, 1, false, function () {
                that.waitTimer = null;
            })
        });
    }
}