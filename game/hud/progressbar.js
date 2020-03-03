class ProgressBar extends Entity
{
  constructor(game, x, y, width, owner, chargeAmount)
  {
    super(game, x, y);
    
    this.offsetX = x;
    this.offsetY = y;
    this.width = width;
    this.progress = 100;
    this.amt = chargeAmount;
    let that = this;
    this.owner = owner;
    this.paused = false;
    this.barBack = new ProgressBarBack(this.game, 0, 0, this);
    this.barBack.animation.setFrame(2);
    this.barFront = new ProgressBarFront(this.game, 0, 0, this);
	
    this.myScale = [1];
    
    this.game.addEntity(this, LAYERS.HUD);
  }
  
  update()
  {
    this.width = this.owner.animation._frameWidth * this.owner.animation._scale
      
    if(!this.paused)
    {
      this.progress += this.amt * this.game._clockTick;
    }
    if (this.progress < 100)
    {
      this.barFront.animation.setFrame(1);
    }
    else
    {
      this.progress = 100;
      this.barFront.animation.setFrame(0);
    }
    this.x = this.owner.x + this.offsetX;
    this.y = this.owner.y + this.offsetY;
    

  }
  
  draw()
  {
    this.barBack.display();
    this.barFront.display();
  }
  
  destroy()
  {
    super.destroy();
    this.barBack.destroy();
    this.barFront.destroy();
  }
}

class ProgressBarFront extends Entity
{
  constructor(game, x, y, attached)
  {
    super(game, x, y);
    this.offsetX = x;
    this.offsetY = y;
    this.attached = attached;
	
    this.myScale = [1];
      
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ProgressBar.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 2},
            0, true, this.myScale);
			
    this.animation._height = STANDARD_DRAW_SCALE * 2;
    
    this.game.addEntity(this, LAYERS.HUD);
  }
  
  draw()
  {
  }
  
  display()
  {
    let screenPos = this.game._camera.drawPosTranslation({x: this.x, y: this.y}, 1);
    this.animation.drawFrame(this.game._clockTick, this.game._ctx, screenPos.x, screenPos.y, false);
  }
  
  update()
  {
    this.animation._height = STANDARD_DRAW_SCALE * 2;
  
    this.myScale[0] = 1;
  
    let t = this.attached.progress / 100;
    this.animation._width = mix(smoothStartN(t, 3), smoothStopN(t, 3), t) * this.attached.width;
  
    this.x = this.attached.x - (this.attached.owner.animation._width) / 2;
    this.y = this.attached.owner.y + this.attached.owner.animation._height/2 + this.animation._height/2;

  }
}

class ProgressBarBack extends Entity
{
  constructor(game, x, y, attached)
  {
    super(game, x, y);
    this.offsetX = x;
    this.offsetY = y;
    this.attached = attached;
      
    this.myScale = [1];
	  
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ProgressBar.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 2},
            0, true, this.myScale);
			
    this.animation._height = STANDARD_DRAW_SCALE * 2;
    
    this.game.addEntity(this, LAYERS.HUD);
  }
  
  draw()
  {
  }
  
  display()
  {
    let screenPos = this.game._camera.drawPosTranslation({x: this.x, y: this.y}, 1);
    this.animation.drawFrame(this.game._clockTick, this.game._ctx, screenPos.x, screenPos.y, false);
  }
  
  update()
  {
    this.animation._height = STANDARD_DRAW_SCALE * 2;

	  this.myScale[0] = 1;
	  
    this.x = this.attached.x - (this.attached.owner.animation._width) / 2;
    this.y = this.attached.owner.y + this.attached.owner.animation._height/2 + this.animation._height/2;
	  
	  this.animation._width = this.attached.width;
  }
}