var AM = new AssetManager();

// no inheritance
function Background(game, spritesheet) {
    this.x = -175;
    this.y = -175;
	this.animation = new Animation(spritesheet, 128, 128, {x:0, y:0}, {x:3, y:0}, 0, true, 10);
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, false);
}

Background.prototype.update = function () {
}

Background.prototype.destroy = function () {
}

function Player(game, spritesheet) {
	this.animation = {current: 0, walkLeft: 0, attackLeft: 0, walkRight: 0, attackRight: 0, walkUp: 0, attackUp: 0, walkDown: 0, attackDown: 0};
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Player.prototype.loadLeftRight = function (spritesheet) {
	this.animation.walkLeft = 		new Animation(spritesheet, 32, 32, {x: 0, y: 1}, {x: 5, y: 1}, 10, true, 10);
	this.animation.attackLeft =		new Animation(spritesheet, 32, 32, {x: 0, y: 2}, {x: 3, y: 2}, 10, true, 10);
	this.animation.walkRight = 		new Animation(spritesheet, 32, 32, {x: 0, y: 5}, {x: 5, y: 5}, 10, true, 10);
	this.animation.attackRight = 	new Animation(spritesheet, 32, 32, {x: 0, y: 6}, {x: 3, y: 6}, 10, true, 10);
	this.animation.current = this.animation.walkLeft;
}

Player.prototype.loadUpDown = function (spritesheet)
{
	this.animation.walkUp = 		new Animation(spritesheet, 32, 32, {x: 0, y: 1}, {x: 5, y: 1}, 10, true, 10);
	this.animation.attackUp = 		new Animation(spritesheet, 32, 32, {x: 0, y: 2}, {x: 3, y: 2}, 10, true, 10);
	this.animation.walkDown = 		new Animation(spritesheet, 32, 32, {x: 0, y: 5}, {x: 5, y: 5}, 10, true, 10);
	this.animation.attackDown = 	new Animation(spritesheet, 32, 32, {x: 0, y: 6}, {x: 3, y: 6}, 10, true, 10);
}

Player.prototype.draw = function () {
    this.animation.current.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, false);
}

Player.prototype.update = function () {
	this.x += -10;
	if(this.x < -100)
	{
		this.x = 800;
	}
}

function PuddleJumper(game, spritesheet) {
	Entity.call(this, game, 0, 0);
	this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 0}, {x: 2, y: 5}, 12, true, 5);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

PuddleJumper.prototype = new Entity();
PuddleJumper.prototype.constructor = PuddleJumper;

PuddleJumper.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, true);
}

PuddleJumper.prototype.update = function () {
	if(this.animation._elapsedTime > this.animation._totalTime * 14/32 &&
	   this.animation._elapsedTime < this.animation._totalTime * 19/32)
	{
		this.speed = this.animation._scale * 110;
		this.y += this.game.clockTick * this.speed;
	}
	
	if(this.y > 700)
	{
		this.y = -0;
	}
	this.animation._scale = smoothStartN(clampBottom(this.y)/ 700, 3) * 10 + .1;
}

PuddleJumper.prototype.init = function () {
	this.animation._scale = smoothStartN(clampBottom(this.y)/ 700, 3) * 10 + .1;
	//console.log(this.animation._scale);
}

function Crosshair(game, spritesheet) {
	this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 0}, {x: 1, y: 0}, 0, true, 5);
    this.x = 800 - 64;
    this.y = 64;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Crosshair.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, true);
}

Crosshair.prototype.update = function (x, y) {
	this.x = x;
	this.y = y;
}

function Bat(game, spritesheet) {
	this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 0}, {x: 3, y: 0}, 10, true, 5);
    this.x = 800 - 64;
    this.y = 64;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Bat.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, true);
}

Bat.prototype.update = function () {
}

function Slash(game, spritesheet) {
	this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 0}, {x: 0, y: 2}, 8, true, 5);
    this.x = 900 / 2;
    this.y = 800 / 2;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
	this.pause = false;
}

Slash.prototype.draw = function () {
	if(this.pause === false)
	{
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, true);
	}
}

Slash.prototype.update = function () {
	if(this.animation._elapsedTime === this.animation._totalTime * 3/4)
	{
		this.pause = true;
	}
}

function Cultist(game, spritesheet) {
	this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 1}, {x: 3, y: 1}, 4, true, 5);
    this.x = 900 / 2;
    this.y = 800 / 2 + 32;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Cultist.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, true);
}

Cultist.prototype.update = function () {
}

AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/mushroomdude.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/key.png");
AM.queueDownload("./img/walls.png");
AM.queueDownload("./img/grounds.png");
AM.queueDownload("./img/BlackMageSideToSideSheet.png");
AM.queueDownload("./img/BlackMageUpDownSheet.png");
AM.queueDownload("./img/PuddleJumper.png");
AM.queueDownload("./img/Bat.png");
AM.queueDownload("./img/Slash.png");
AM.queueDownload("./img/Cultist.png");
AM.queueDownload("./img/Crosshair.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    var gameEngine = new GameEngine();
	
    gameEngine.init(ctx);
    gameEngine.start();
	gameEngine.startInput();

	var background = new Background(gameEngine, AM.getAsset("./img/grounds.png"));

    gameEngine.addEntity(background);
	
	//var player = new Player(gameEngine);
	//player.loadLeftRight(AM.getAsset("./img/BlackMageSideToSideSheet.png"));
	//player.loadUpDown(AM.getAsset("./img/BlackMageUpDownSheet.png"));
	//gameEngine.addEntity(player);
	
	//var puddy = new PuddleJumper(gameEngine, AM.getAsset("./img/PuddleJumper.png"));
	//puddy.x = 5 * 32;
	//puddy.y = 1 * 32;
	//gameEngine.addEntity(puddy);
	//
	//var puddy1 = new PuddleJumper(gameEngine, AM.getAsset("./img/PuddleJumper.png"));
	//puddy1.x = 7 * 32;
	//var puddy2 = new PuddleJumper(gameEngine, AM.getAsset("./img/PuddleJumper.png"));
	//puddy2.x = 3 * 32;
	//
	//gameEngine.addEntity(puddy1);
	//gameEngine.addEntity(puddy2);
	
	//var bat = new Bat(gameEngine, AM.getAsset("./img/Bat.png"));
	//gameEngine.addEntity(bat);
	
	//var slash = new Slash(gameEngine, AM.getAsset("./img/Slash.png"));
	//gameEngine.addEntity(slash);
	
	//var cultist = new Cultist(gameEngine, AM.getAsset("./img/Cultist.png"));
	//gameEngine.addEntity(cultist);
	
	var tim = new TimerCallBack(gameEngine, .1, true, function() {
		let temp = new PuddleJumper(gameEngine, AM.getAsset("./img/PuddleJumper.png"));
		temp.x = canvas.width/2 + (Math.random() * 2 - 1) * canvas.width/2;
		temp.y = canvas.height/2 + (Math.random() - 1) * canvas.height/2;
		temp.init();
		gameEngine.addEntity(temp);
	});
	
	gameEngine.addTimer(tim);
	
	var tim2 = new TimerCallBack(gameEngine, .1, true, function() {
		background.animation.setFrame(0);
	});
	
	gameEngine.addTimer(tim2);
	

	let temp = new Crosshair(gameEngine, AM.getAsset("./img/Crosshair.png"));
	temp.animation.setFrame(0);
	
	gameEngine.setReticle(temp);
	
    console.log("All Done!");
});