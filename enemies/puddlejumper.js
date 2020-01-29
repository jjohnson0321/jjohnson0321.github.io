class PuddleJumper extends Entity
{
	constructor(game, x, y)
	{
		super(game, x, y);
		//console.log("HELLO:");
		this.moveAnimation = new Animation(this.game.AM.getAsset("./img/enemies/PuddleJumper.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 2, y: 5}, 12, true, STANDARD_DRAW_SCALE);
    this.attackAnimation = null;
    this.deathAnimation = new Animation(this.game.AM.getAsset("./img/enemies/PuddleDeath.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 4, y: 0}, 12, false, STANDARD_DRAW_SCALE);
      
    this.animation = this.moveAnimation;
      
		this.speed = 100;
		this.radius = STANDARD_ENTITY_RADIUS;
		
		game.addEntity(this, "enemy");
	}
	update()
	{
		if(this.animation._elapsedTime > this.animation._totalTime * 14/STANDARD_ENTITY_FRAME_WIDTH &&
		   this.animation._elapsedTime < this.animation._totalTime * 19/STANDARD_ENTITY_FRAME_WIDTH)
		{
			this.speed = this.animation._scale * 110;
			this.y += this.game._clockTick * this.speed;
		}
	}
  
  destroy()
  {
    super.destroy();
    new Remnant(this.game, this.x, this.y, this.deathAnimation);
  }
}