function Bat(game, x, y) {
	this.animation = new Animation(game.AM.getAsset("./img/Bat.png"), 32, 32, {x: 0, y: 0}, {x: 3, y: 0}, 10, true, 5);
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Bat.prototype = new Entity();
Bat.prototype.constructor = Bat;

Bat.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, true);
}

Bat.prototype.update = function () {
	this.x += 2;
	this.y += 2;
}