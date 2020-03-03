class HedgeMonster extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);

        this.wakeAnimation = new Animation(game.AM.getAsset("./img/enemies/HedgeMonster.png"),
            STANDARD_ENTITY_FRAME_WIDTH * 4, STANDARD_ENTITY_FRAME_WIDTH * 4,
            {x: 0, y: 0}, {x: 5, y: 0},
            4, false, STANDARD_DRAW_SCALE);

        this.deathAnimation = new Animation(game.AM.getAsset("./img/enemies/HedgeMonsterToSleep.png"),
            STANDARD_ENTITY_FRAME_WIDTH * 4, STANDARD_ENTITY_FRAME_WIDTH * 4,
            {x: 0, y: 0}, {x: 5, y: 0},
            4, false, STANDARD_DRAW_SCALE);

        this.moveAnimation = new Animation(game.AM.getAsset("./img/enemies/HedgeMove.png"),
            STANDARD_ENTITY_FRAME_WIDTH * 4, STANDARD_ENTITY_FRAME_WIDTH * 4,
            {x: 0, y: 0}, {x: 3, y: 0},
            4, true, STANDARD_DRAW_SCALE);

        this.animation = this.wakeAnimation;
        this.animation.pause();

        if (spawner !== null) {
            this.home = {x: spawner.x, y: spawner.y};
        } else {
            this.home = {x: 0, y: 0};
        }

        this.radius = STANDARD_ENTITY_RADIUS * 4;
        this.width = 96;
        this.isWaking = false;
        this.isAwake = false;
        this.isActivated = false;
        this.speed = 100;
        this.hp = 15;
    }

    update() {
        super.update();

        let dist = lengthV(dirV(this, this.game.player));
        if (this.isActivated) {
            this.pursue();
        } else if (this.isWaking) {
            if (this.animation.isDone()) {
                this.isActivated = true;
                this.isWaking = false;
                this.animation = this.moveAnimation;
                this.animation.unpause();
            }
        } else if (dist < this.radius * 2) {
            this.pathfind(500, 20);
            if (this.goalPoint &&
                this.goalPoint.x === this.game.player.x &&
                this.goalPoint.y === this.game.player.y) {

                this.wakeUp();
            }
        } else if (dist > this.width * 4) {
            this.pursue();
        }
    }

    wakeUp() {
        this.game.audioManager.pauseMusic();
        this.game.audioManager.setMusic('hedgeMonsterMusic');
        this.game.audioManager.restartMusic();
        this.game.audioManager.playMusic();
        this.isWaking = true;
        this.animation = this.wakeAnimation;
        this.animation.resetAnimation();
        this.animation.unpause();
    }

    pursue() {
        this.pathfind(this.game.sceneManager.level._width * this.game.sceneManager.level._width + this.game.sceneManager.level._height * this.game.sceneManager.level._height, Infinity);
        if (this.goalPoint) {
            this.go(normalizeV(dirV(this, this.goalPoint)));
        }
    }

    goToSleep() {
        this.animation = this.wakeAnimation;
        this.animation.resetAnimation();
        this.animation.pause();
    }

    destroy() {
        super.destroy();

        this.game.audioManager.pauseMusic();
        this.game.audioManager.setMusic('hedgeMazeMusic');
        this.game.audioManager.restartMusic();
        this.game.audioManager.playMusic();
    }
}