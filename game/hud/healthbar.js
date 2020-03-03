class HealthBar extends Entity
{
  constructor(game, x, y, scale, owner, count = 0, max = 0)
  {
    super(game, x, 30);
    
    this.offsetX = x;
    this.offsetY = 30;
    this.scale = scale;
    this.owner = owner;
    this.healAmt = 0;
    this.attached = null;
    this.paused = false;
	
    this.barOutline = new OutlineBar(this.game, 0, 0, this);
    this.barOutline.animation.setFrame(0);
    
    this.barBack = new HpBarBack(this.game, 0, 0, this);
    this.barBack.animation.setFrame(2); // set back to black
    
    this.barFront = new HpBarFront(this.game, 0, 0, this); // set front to light red
    this.barFront.animation.setFrame(0);
    
    this.game.addEntity(this, LAYERS.HUD);
	
    this.width = this.game._ctx.canvas.width * this.scale;
    this.count = count;
    this.max = max;
  }
  
  update()
  {
    this.width = this.game._ctx.canvas.width * this.scale;
	  
    if(this.attached !== null)
    {
      this.x = this.attached.x + this.offsetX;
      this.y = this.attached.y + this.offsetY;
    }
	else
	{
		if(this.scale !== 0.9)
		{
			this.x = this.game._ctx.canvas.width/(this.max * 2) + this.game._ctx.canvas.width/(this.max * 2) * (this.count * 2);
			this.y = 30;
		}
		else
		{
			this.x = this.game._ctx.canvas.width/2;
			this.y = 30;
		}
	}
  }
  
  draw()
  {	
    this.barOutline.display();
    this.barBack.display();
    this.barFront.display();
  }
  
  attachTo(attached)
  {
    this.attached = attached;
  }
  
  destroy()
  {
    super.destroy();
    console.log("got here 1");
    this.barBack.destroy();
    this.barFront.destroy();
    this.barOutline.destroy();
    console.log("got here 2");
  }
}

class OutlineBar extends Entity
{
	constructor(game, x, y, attached)
	{
		super(game, x, y);
		this.offsetX = x;
		this.offsetY = y;
		this.attached = attached;
		
		this.borderSize = 10;
		
		this.myAddScale = this.attached.width + this.borderSize;
		this.myScale = [1];
		
		this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ProgressBar.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 2},
            0, true, this.myScale);
			
		this.animation._height = this.animation._frameHeight * 1 + this.borderSize * 2;
    
		this.game.addEntity(this, LAYERS.HUD);
	}
	
  draw()
	{
	}
	
	display() // this is done to ensure the order is preserved.
	{
		this.animation.drawFrame(this.game._clockTick, this.game._ctx, this.x, this.y, true);
	}
	
  update()
  {
    this.myAddScale = this.attached.width + this.borderSize;
    this.myScale[0] = 1;//this.attached.game._ctx.canvas.width;
    this.x = this.attached.x + this.offsetX;
    this.y = this.attached.y + this.offsetY;
    this.animation._width = this.attached.width + this.borderSize * 2;
  }
}

class HpBarFront extends Entity
{
  constructor(game, x, y, attached)
  {
    super(game, x, y);
    this.offsetX = x;
    this.offsetY = y;
    this.attached = attached;
	
    this.myAddScale = this.attached.width;
    this.myScale = [1];
      
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/HealthBar.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 2},
            0, true, this.myScale);
			
    this.animation._height = this.animation._frameHeight * 1;
    
    this.game.addEntity(this, LAYERS.HUD);
  }
  
  draw()
  {
  }
  
  display() // this is done to ensure the order is preserved.
  {
    this.animation.drawFrame(this.game._clockTick, this.game._ctx, this.x, this.y, false);
  }
  
  update()
  {
	  this.myScale[0] = 1;//this.attached.game._ctx.canvas.width;
	  this.myAddScale = this.attached.width;
	  
    this.x = this.attached.x - ( (this.attached.width * this.animation._scale) / 2);
    this.y = this.attached.y - ((this.animation._height * this.animation._scale) / 2);
	  
	  let t = this.attached.owner.hp / this.attached.owner.maxHp;
	  this.animation._width = mix(smoothStartN(t, 3), smoothStopN(t, 3), t) * this.attached.width;
  }
}

class HpBarBack extends Entity
{
  constructor(game, x, y, attached)
  {
    super(game, x, y);
    this.offsetX = x;
    this.offsetY = y;
    this.attached = attached;
	
    this.myAddScale = this.attached.width;
    this.myScale = [1];
      
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/HealthBar.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 2},
            0, true, this.myScale);
			
    this.animation._height = this.animation._frameHeight * 1;
    
    this.game.addEntity(this, LAYERS.HUD);
  }
  
  draw()
  {
  }
  
  display() // this is done to ensure the order is preserved.
  {
    this.animation.drawFrame(this.game._clockTick, this.game._ctx, this.x, this.y, true);
  }
  
  update()
  {
	  this.myScale[0] = 1;//this.attached.game._ctx.canvas.width;
	  this.myAddScale = this.attached.width;

    this.x = this.attached.x + this.offsetX;
    this.y = this.attached.y + this.offsetY;
	  
	  this.animation._width = this.attached.width;
  }
}