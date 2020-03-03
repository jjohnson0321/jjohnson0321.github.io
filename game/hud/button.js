class Button {
    constructor(game, x, y, animations, callback) {
        this.game = game;
        this.xOffset = x;
        this.yOffset = y;
        this.x = game.ctx.canvas.width/2 + this.xOffset;
        this.y = game.ctx.canvas.height/2 + this.yOffset;

        this.callback = callback;
        this.width = 288;
        this.height = 96;
        this.hoverAnimation = animations.hoverAnimation;
        this.regularAnimation = animations.regularAnimation;
        this.clickAnimation = animations.clickAnimation;
        this.animation = animations.regularAnimation;
    }

    draw() {
        this.animation.drawFrame(this.game._clockTick, this.game._ctx, this.x, this.y, true);
    }

    update() {
        this.x = this.game.ctx.canvas.width/2 + this.xOffset;
        this.y = this.game.ctx.canvas.height/2 + this.yOffset;
        if (pointToSquare(this.game.mousePos, this)) {
            if (this.game.click) {
                this.game.click = false;
                this.animation = this.clickAnimation;
                this.callback();
            } else {
                this.animation = this.hoverAnimation;
            }
        } else {
            this.animation = this.regularAnimation;
        }
    }
}