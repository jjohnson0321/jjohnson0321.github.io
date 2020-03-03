class Turret extends Entity {
    constructor(game, x, y, fireRate, spinning, cross, projectileSpeed, projectileLifeTime, projectileDirection, projectileMove, projectileEasing, initialDelay, burstDelay = 2, burstFire = 3) {
        super(game, x, y);
        this.x = indexToCoordinate(x);
        this.y = indexToCoordinate(y);

        this.rotation = projectileDirection * 2 * Math.PI;
        this.timer = new Timer(this.game, 4, true);
        this.fireRate = fireRate;
        this.lastShotTime = 0;
        this.spinning = spinning;
        this.cross = cross;

        this.pSpeed = projectileSpeed;
        this.pLifeTime = projectileLifeTime;
        this.pMove = projectileMove;
        this.pEasing = projectileEasing;
        
        this.burstFire = burstFire;
        this.burstDelay = burstDelay;

        this.projectileSprite = game.AM.getAsset("./img/projectiles/Fireball.png");

        this.projectileAnimation = new Animation(this.projectileSprite,
            STANDARD_ENTITY_FRAME_WIDTH * 0.5, STANDARD_ENTITY_FRAME_WIDTH * 0.5,
            {x: 0, y: 0}, {x: 3, y: 0},
            6, true, STANDARD_DRAW_SCALE);

        let that = this;

        this.attackTimer = new TimerCallback(this.game, 1 / this.fireRate, true, function () {
            if(that.burstDelay > 0)
            {
              that.attackTimer.pause();
              new TimerCallback(that.game, that.burstDelay, false, function() { that.attackTimer.unpause(); });
            }
            for(let i = 0; i < that.burstFire; i++)
            {
              new TimerCallback(that.game, i / that.fireRate, false, function() {that.fire();});
            }

        });
        this.attackTimer.pause();
        new TimerCallback(this.game, initialDelay, false, function () { that.attackTimer.unpause(); });

        this.game.addEntity(this, LAYERS.FLOOR);
    }

    update() {
        if (this.spinning) {
            this.rotation = this.timer.getPercent() * 2 * Math.PI;
        }
    }

    draw() {

    }

    fire() {
        let dir1 = {
            x: Math.cos(this.rotation),
            y: Math.sin(this.rotation)
        };
        new EasingProjectile(this.game, this.x, this.y, dir1, this.pSpeed, this.pLifeTime, true, this, this.projectileAnimation, 1, 5, 10, this.pMove, this.pEasing);
        if (this.cross) {
            let dir2 = {
                x: Math.cos(this.rotation + Math.PI * 2 / 4),
                y: Math.sin(this.rotation + Math.PI * 2 / 4)
            };
            let dir3 = {
                x: Math.cos(this.rotation + Math.PI * 4 / 4),
                y: Math.sin(this.rotation + Math.PI * 4 / 4)
            };
            let dir4 = {
                x: Math.cos(this.rotation + Math.PI * 6 / 4),
                y: Math.sin(this.rotation + Math.PI * 6 / 4)
            };
            new EasingProjectile(this.game, this.x, this.y, dir2, this.pSpeed, this.pLifeTime, true, this, this.projectileAnimation, 1, 5, 10, this.pMove, this.pEasing);
            new EasingProjectile(this.game, this.x, this.y, dir3, this.pSpeed, this.pLifeTime, true, this, this.projectileAnimation, 1, 5, 10, this.pMove, this.pEasing);
            new EasingProjectile(this.game, this.x, this.y, dir4, this.pSpeed, this.pLifeTime, true, this, this.projectileAnimation, 1, 5, 10, this.pMove, this.pEasing);
        }
    }
}
