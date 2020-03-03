const STANDARD_ENTITY_FRAME_WIDTH = 32;
const STANDARD_ENTITY_RADIUS = 20;
let ID = 0;

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
    
		this.collider = new Collider(0, 0, 10, 10, 10, 10, null, 150);
		
		this.myScale = [STANDARD_DRAW_SCALE];
		this.myAddScale = this.myScale[0] / STANDARD_DRAW_SCALE[0];
		
		//draw modes
		
		this.oldPos = {x: this.x, y: this.y};
	}
  
  wallCollision(newPos)
  {
    let dir = dirV(this.oldPos, newPos);
    let xOffset = 0;
    let yOffset = 0;

    let returnValue = this.game._sceneManager.level.quickCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
    //console.log(returnValue);
    if(returnValue === true)
    {
      return returnValue;
    }

    yOffset = this.collider._upHit;
    returnValue = this.game._sceneManager.level.quickCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
    if(returnValue === true)
    {
      return returnValue;
    }

    yOffset = this.collider._downHit;
    returnValue = this.game._sceneManager.level.quickCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
    if(returnValue === true)
    {
      return returnValue;
    }

    xOffset = this.collider._leftHit;
    returnValue = this.game._sceneManager.level.quickCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
    if(returnValue === true)
    {
      return returnValue;
    }

    xOffset = this.collider._rightHit;
    returnValue = this.game._sceneManager.level.quickCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
    if(returnValue === true)
    {
      return returnValue;
    }
    
    return false;
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
		if (this.game._camera.isOnScreen({x: this.x, y: this.y}, 100, 100, STANDARD_DRAW_SCALE)) {
			let screenPos = this.game._camera.drawPosTranslation({x: this.x, y: this.y}, 1);
			this.animation.drawFrame(this.game._clockTick, this.game._ctx, screenPos.x, screenPos.y, true);
		}
	}
}