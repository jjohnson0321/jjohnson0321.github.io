class Bat extends Entity
{
	constructor(game, x, y)
	{
		super(game, x, y);
		this.circle = Math.floor(Math.random() * 300);
		this._myScale = [2 * STANDARD_DRAW_SCALE];
    
		this.moveAnimation = new Animation(game.AM.getAsset("./img/enemies/Bat.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 3, y: 0}, 10, true, this._myScale);
    this.attackAnimation = new Animation(game.AM.getAsset("./img/enemies/Bat.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 1}, {x: 3, y: 1}, 10, true, this._myScale);
    this.deathAnimation = new Animation(game.AM.getAsset("./img/enemies/Bat.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 2}, {x: 3, y: 2}, 10, false, this._myScale);
    
    this.animation = this.moveAnimation;

		this.speed = 100;
		this.radius = STANDARD_ENTITY_RADIUS;

		game.addEntity(this, "enemy");
	}

	update()
	{
		this._myScale[0] = 2 * STANDARD_DRAW_SCALE;
    	let attackVector = normalizeV(dirV({x: this.x, y: this.y}, {x: this.game._player.x + (Math.cos((this.circle / 180) * Math.PI)) * (75), y: this.game._player.y + (Math.sin((this.circle / 180) * Math.PI)) * 75}));
		this.circle = (this.circle + 1) % 360;
		this.x += attackVector.x * this.speed * this.game._clockTick;
    	this.y += attackVector.y * this.speed * this.game._clockTick;
	}
  
  destroy()
  {
    super.destroy();
    new Remnant(this.game, this.x, this.y, this.deathAnimation);
  }
}