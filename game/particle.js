class ParticleEmitter extends Entity
{
  constructor(game, x, y, rate, startDir, endDir, startSpeed, endSpeed, startLifetime, endLifetime, startSize, endSize, startColor, endColor, attached = null)
  {
    super(game, x, y);
    this.startDir = startDir;
    this.endDir = endDir;
    this.startSpeed = startSpeed;
    this.endSpeed = endSpeed;
    this.startLifetime = startLifetime;
    this.endLifetime = endLifetime;
    this.startSize = startSize;
    this.endSize = endSize;
    this.startColor = startColor;
    this.attached = attached;
    
    let that = this;
    this.timer = new TimerCallback(this.game, 1/rate, true, function () 
    {
      new Particle(that.game, that.x, that.y, RandomBetween(that.startDir, that.endDir), RandomBetween(that.startSpeed, that.endSpeed), RandomBetween(that.startLifetime, that.endLifetime));
    });
  }
  
  draw()
  {
  }
  
  update()
  {
    if(this.attached !== null)
    {
      this.x = this.attached.x;
      this.y = this.attached.y;
    }
  }
  
  destroy()
  {
    super.destroy();
    this.timer.destroy();
  }
}

class Particle extends Entity {
    constructor(game, x, y, dir, speed, lifetime, attached = null) {
        super(game, x, y);

        this.startX = x;
        this.startY = y;

        this.dx = 0;
        this.dy = 0;

        this.dir = {x: Math.cos(dir / 360 * 2 * Math.PI), y: Math.sin(dir / 360 * 2 * Math.PI)};
        this.speed = speed;

        this.lifetime = lifetime;
        
        var that = this;
        this.timer = new TimerCallback(that.game, that.lifetime, false, function () {
            that.destroy();
        });
        this.ctx = game.ctx;
        this.attached = attached;
        
        this.myAddScale = 1/15;
        this.myScale = [STANDARD_DRAW_SCALE * this.myAddScale];        

        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ProgressBar.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 0, y: 2},
            0, true, this.myScale);
        this.animation.pause();
        this.animation.setFrame(0);
        
        this.game.addEntity(this, LAYERS.PARTICLES);
    }
    
    update()
    {
      this.x += this.dir.x * this.speed * this.game._clockTick;
      this.y += this.dir.y * this.speed * this.game._clockTick;
      
      /*
      this.x = this.startX + this.dx;
      this.y = this.startY + this.dy;
      */
      
      this.myScale[0] = STANDARD_DRAW_SCALE * this.myAddScale;
    }
}