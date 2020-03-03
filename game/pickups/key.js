class Key extends Entity {
    constructor(game, x, y, falling = false) {
        super(game, x, y);
		this.startX = x;
		this.startY = y;
        game.addEntity(this, LAYERS.PICKUPS);
        let fps = 7;
        if (Math.random() > .5) fps = -7;
        this.addScale = 1.5;
        this.scale = [STANDARD_DRAW_SCALE * this.addScale];
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/pickups/key.png"), 32, 32, {x: 0, y: 0}, {x: 7, y: 0}, fps, true, this.scale);
        this.collider = new Collider(0, 0, 10, 9, 4, 4, 15, Infinity);
		this.falling = falling;
		this.timer = null;
		
		let that = this;
		
		if(this.falling)
		{
			this.timer = new TimerCallback(this.game, 2, false, function () {that.falling = false;});
		}
    }

    update() {
        this.scale[0] = STANDARD_DRAW_SCALE * this.addScale;
		
		if(this.falling)
		{
			this.y = this.startY - (1-(bounceClamp(bezier3(1, 1.2, this.timer.getPercent())))) * this.game._ctx.canvas.height * 1.25;
			this.x = this.startX;
		}
		else
		{
			this.x = this.startX;
			this.y = this.startY;
		}

        if(this.game._player !== undefined && this.falling !== true)
        {
          if (checkCollision({x: this.x, y: this.y}, this.collider, {x: this.game._player.x, y: this.game._player.y}, this.game._player._collider)) {
              this.giveToPlayer();
              this.destroy();
          }
        }
    }

    giveToPlayer() {
        this.game._player.keys += 1;
    }
}

class SpecialKey extends Key {
    constructor(game, x, y, falling = false) {
        super(game, x, y, falling);

        let fps = 7;
        if (Math.random() > .5) fps = -7;

        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/pickups/specialKey.png"),
            32, 32,
            {x: 0, y: 0}, {x: 7, y: 0},
            fps, true, this.scale);
    }

    giveToPlayer() {
        this.game._player.specialKeys += 1;
    }
}