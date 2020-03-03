class CactusBoi extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);

        let spriteSheet = game.AM.getAsset("./img/enemies/CactusBoiSheet.png");
        let projectile = game.AM.getAsset("./img/projectiles/CactusSpine.png");

        this.moveAnimation = new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            10, true, STANDARD_DRAW_SCALE);

        this.attackAnimation = new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 1, y: 1},
            2, false, STANDARD_DRAW_SCALE);

        this.deathAnimation = new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 2, y: 2},
            3, false, STANDARD_DRAW_SCALE);

        this.projectileAnimation = new Animation(projectile,
            2, 2,
            {x: 0, y: 0}, {x: 0, y: 0},
            3, false, STANDARD_DRAW_SCALE);

        this.animation = this.moveAnimation;
        this.speed = 40;
        this.radius = STANDARD_ENTITY_RADIUS;
        this.isAttacking = false;
    }

    update() {
        let vecToPlayer = dirV(this, this.game._player);
        let attackVector = normalizeV(vecToPlayer);

        if (this.isAttacking) {
            if (this.animation.isDone()) {
                this.isAttacking = false;
                for (let i = -1; i < 1.5; i += 0.5) {
                    for (let j = -1; j < 1.5; j += 0.5) {
                        new Projectile(this.game,
                            this.x, this.y,
                            {x: i, y: j},
                            300, 0.3, true, this,
                            this.projectileAnimation,
                            1, 2);
                    }
                }
                this.animation = this.moveAnimation;
                this.animation.unpause();
            }
        } else {
            this.pathfind(1000, 50);
            if (lengthV(vecToPlayer) > 150 ||
                (this.goalPoint.x === this.game.player.x &&
                    this.goalPoint === this.game.player.y)) {

                if (this.aboutToAttackTimer) {
                    this.aboutToAttackTimer.destroy();
                    this.aboutToAttackTimer = null;
                }
                if (this.goalPoint) {
                    this.go(normalizeV(dirV(this, this.goalPoint)));
                }
            } else {
                this.attack();
            }
        }
    }

    attack() {
        this.animation = this.attackAnimation;
        this.animation.resetAnimation();
        this.isAttacking = true;
        this.animation.unpause();
    }
}