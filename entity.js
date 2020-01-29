const STANDARD_ENTITY_FRAME_WIDTH = 32;
const STANDARD_ENTITY_RADIUS = 20;

class Entity
{
	constructor(game, x, y)
	{
		this.game = game;
		this.animation = null;
		this.x = x;
		this.y = y;
		this.id = 0;
		this.removeFromWorld = false;
		this.speed = 100;
		
		this.circle = false;
		this.radius = 10;
    
    this._myScale = [5 * STANDARD_DRAW_SCALE];
	}
	
	setAnimation(spritesheet)
	{
		this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, 10);
	}
	
	destroy()
	{
		this.removeFromWorld = true;
	}
	
	update()
	{
	}

	draw()
	{
		let screenPos = this.game._camera.drawPosTranslation({x: this.x, y: this.y}, 1);
		
		this.animation.drawFrame(this.game._clockTick, this.game._ctx, screenPos.x, screenPos.y, true);
	}
}