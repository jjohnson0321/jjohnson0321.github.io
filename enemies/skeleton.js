class Skeleton extends Entity
{
	constructor(game, x, y)
	{
		super(game, x, y);
		this.moveAnimation = new Animation(game.AM.getAsset("./img/enemies/SkeletonWalk.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 5, y: 0}, 10, true, STANDARD_DRAW_SCALE);
    	this.attackAnimation = new Animation(game.AM.getAsset("./img/enemies/SkeletonAttack.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 3, y: 0}, 10, true, STANDARD_DRAW_SCALE);
    	this.deathAnimation = new Animation(game.AM.getAsset("./img/enemies/SkeletonDeath.png"),
			STANDARD_ENTITY_FRAME_WIDTH,
			STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 8, y: 0}, 10, false, STANDARD_DRAW_SCALE);
    
    	this.animation = this.moveAnimation;

		this.speed = 75;
		this.radius = STANDARD_ENTITY_RADIUS;

		game.addEntity(this, "enemy");
	}

	update()
	{
		let skelPlayVector = dirV({x: this.x, y: this.y}, {x: this.game._player.x, y: this.game._player.y})
		if (lengthV(skelPlayVector) > 120) {
			let attackVector = normalizeV(skelPlayVector);
    		this.x += attackVector.x * this.speed * this.game._clockTick;
			this.y += attackVector.y * this.speed * this.game._clockTick;
		}
	}
  
  destroy()
  {
    super.destroy();
    new Remnant(this.game, this.x, this.y, this.deathAnimation);
  }
}