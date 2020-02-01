window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.entities = [];
	this.timers = []; // new
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.set = false;
	this.score = 0;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.clock = new Clock(); // new

}

GameEngine.prototype.start = function () {

    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {


    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }

    var that = this;

    // event listeners are added here
	
	var x = 1;
	
	this.ctx.canvas.x = 3;
	
    this.ctx.canvas.addEventListener("mousedown", function (e) {
		var x = 2;

        that.click = getXandY(e);
        that.clicking = true;
		that.reticle.animation.setFrame(1);
    }, false);
	
	this.ctx.canvas.addEventListener("mouseup", function (e) {
		that.clicking = false;
		that.reticle.animation.setFrame(0);
    }, false);

    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        that.click = getXandY(e);

        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
		

		var element = that.ctx.canvas, offsetX = 0, offsetY = 0, mx, my;

		// Compute the total offset
		if (element.offsetParent !== undefined) {

				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;

		}

		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;

		
        that.mouseX = mx;
		that.mouseY = my;

    }, false);

    this.ctx.canvas.addEventListener("mousewheel", function (e) {

        that.wheel = e;

    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        console.log(e);
        console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    this.ctx.canvas.addEventListener("keypress", function (e) {
        if (e.code === "KeyD") that.d = true;
        that.chars[e.code] = true;
        console.log(e);
        console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        console.log(e);
        console.log("Key Up Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
	entity.id = this.entities.length; // new
    this.entities.push(entity);
}

//new
GameEngine.prototype.removeEntity = function (entity) {
    this.entities[entity.id] = this.entities[this.entities.length-1];
	this.entities[entity.id].id = entity.id;
	this.entities[this.entities.length-1] = entity;
	this.entities.pop();
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
	
	if(this.set === true)
	{
		this.reticle.draw(this.ctx);
	}
	
	this.ctx.font = "20px Georgia";
	this.ctx.fillText("SCORE: " + this.score, 10, 25);
	
    this.ctx.restore();
	
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
		if(this.clicking === true)
		{
			let scale = entity.animation._scale;
			if(scale < 1)
			{
				scale = 1;
			}
			let ctr = entity.animation.getCenter(entity.x, entity.y);
			if(circleToCircle({x: ctr.x, y: ctr.y, radius: entity.animation._scale * 6}, {x: this.mouseX, y: this.mouseY, radius: 25}) === true)
			{
				entity.destroy();
				this.score += 100;
			}
		}
		if(entity.done)
		{
			this.removeEntity(entity);
			entitiesCount = this.timers.length;
			i--;
			continue;
		}
    }
	
	//new
	var timersCount = this.timers.length;
	
	for (var i = 0; i < timersCount; i++)
	{
		let tim = this.timers[i];
		if(tim.done)
		{
			this.removeTimer(tim);
			timersCount = this.timers.length;
			i--;
			continue;
		}
		this.timers[i].update(this.clockTick);
	}
	if(this.set === true)
	{
		this.reticle.update(this.mouseX, this.mouseY);
	}
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.clock.tick(); // new
    this.update();
    this.draw();
}

//new
GameEngine.prototype.addTimer = function (timer) {
	timer.id = this.timers.length; // new
    this.timers.push(timer);
	//console.log("add: " + this.timers.length);
}

//new
GameEngine.prototype.setReticle = function (reticle) {
	//console.log("This");
	this.reticle = reticle;
	this.set = true;
}

//new
GameEngine.prototype.removeTimer = function (timer) {
    this.timers[timer.id] = this.timers[this.timers.length-1];
	this.timers[timer.id].id = timer.id;
	this.timers[this.timers.length-1] = timer;
	this.timers.pop();
	//console.log("remove: " + this.timers.length);
}


// Renamed Timer as Clock function;
function Clock() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Clock.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
	this.id = 0; // new
    this.removeFromWorld = false;
}

Entity.prototype.destroy = function() {
	this.done = true;
}

Entity.prototype.update = function () {
	//console.log("hello");
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}