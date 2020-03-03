class Bat extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        this.circle = Math.floor(Math.random() * 360);
        this.myScale = [2 * STANDARD_DRAW_SCALE];

        this.moveAnimation = new Animation(game.AM.getAsset("./img/enemies/Bat.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0}, 10, true, this.myScale);
        this.attackAnimation = new Animation(game.AM.getAsset("./img/enemies/Bat.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 3, y: 1}, 10, true, this.myScale);
        this.deathAnimation = new Animation(game.AM.getAsset("./img/enemies/Bat.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 3, y: 2}, 10, false, this.myScale);

        this.animation = this.moveAnimation;

        this.speed = 100;
        this.collider = new Collider(0, 0, -13, 12, -15, 16, null, 150);
        this.oldCircle = 0;
        this.radius = STANDARD_ENTITY_RADIUS - 5;
        this.inRange = false;
    }

    update() {
        this.myScale[0] = 2 * STANDARD_DRAW_SCALE;
        this.pathfind(1000, 50);
        if (this.goalPoint) {
            let vec = dirV(this, this.goalPoint);
            let dist = dirV(this, this.game.player);
            if (lengthV(dist) < 80 ||
                (
                    this.goalPoint.x === this.game.player.x &&
                    this.goalPoint.y === this.game.player.y)
                ) {

                this.circlePlayer();
            } else {
                this.inRange = false;
                this.go(normalizeV(vec));
            }
        }
    }

    circlePlayer() {
        let vec = dirV(this, this.goalPoint);
        vec = normalizeV(vec);
        if (!this.inRange) {
            this.inRange = true;
            this.circle = Math.atan2(vec.y, vec.x);
            this.circle = this.circle * 180 / Math.PI + 180;
        }
        else {
            this.oldCircle = this.circle;
            this.circle = (this.circle + this.speed * this.game._clockTick) % 360;
        }
        this.go(normalizeV(dirV(this, {
            x: this.game.player.x + (Math.cos((this.circle / 180) * Math.PI)) * (75),
            y: this.game.player.y + (Math.sin((this.circle / 180) * Math.PI)) * 75
        })));
    }
}