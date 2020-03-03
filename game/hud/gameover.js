class GameOver {
    constructor(game, dead) {
        this.game = game;
        this.x = game.ctx.canvas.width/2;
        this.y = game.ctx.canvas.height/2 - 200;

        this._myScale = [STANDARD_DRAW_SCALE * 4];
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/GameOver.png"),
            STANDARD_ENTITY_FRAME_WIDTH * 2, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 0},
            11, false, this._myScale);
        this.animation.pause();

        let that = this;

        this.retryButton = new Button(game, 0, 0, {
                regularAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/retry.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                clickAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/retrypress.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                hoverAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/retryhover.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
            },
            function () {
                that.game.destroyLevel();
                that.game.LoadLevel(that.game.sceneManager.levelFile, that.game.sceneManager.npcsAtStartOfLevel);
            });

        this.restartButton = new Button(game, 0, 100, {
                regularAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/restart.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                clickAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/restartpress.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                hoverAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/restarthover.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
            },
            function () {
                that.game.destroyLevel();
                that.game.audioManager.pauseMusic();
                that.game.init(that.game.ctx);
            });

        this.creditsButton = new Button(game, 0, 202, {
                regularAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/credits.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                clickAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/creditspress.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                hoverAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/creditshover.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
            },
            function () {
                window.onbeforeunload= null;
                window.location.href = "../credits.html";
            });

        this.menuButton = new Button(game, 0, 304, {
                regularAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/main.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                clickAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/mainpress.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
                hoverAnimation: new Animation(ASSET_MANAGER.getAsset("../menuImages/mainhover.png"), 288, 96,
                    {x: 0, y: 0}, {x: 0, y: 0}, 1, true, 1),
            },
            function () {
                window.onbeforeunload= null;
                window.location.href = "../index.html";
            });
    }

    draw() {
        this.game.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.game.ctx.fillRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);

        this.animation.drawFrame(this.game._clockTick, this.game._ctx, this.x, this.y, true);
        this.retryButton.draw();
        this.restartButton.draw();
        this.creditsButton.draw();
        this.menuButton.draw();

    }

    update() {
        this.x = this.game.ctx.canvas.width/2;
        this.y = this.game.ctx.canvas.height/2 - 200;

        this.retryButton.update();
        this.restartButton.update();
        this.creditsButton.update();
        this.menuButton.update();
    }
}

