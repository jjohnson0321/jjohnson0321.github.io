class Crosshair
{
	constructor(game)
	{
		this.gameAnimation = new Animation(game.AM.getAsset("./img/hud/Crosshair.png"),
			STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 1, y: 0},
			0, true, 6);
    this.menuAnimation = new Animation(game.AM.getAsset("./img/hud/menucursor.png"),
			STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
			{x: 0, y: 0}, {x: 1, y: 0},
			0, true, 4);
    this.animation = this.menuAnimation;
		this.x = 800 - 64;
		this.y = 64;
		this.game = game;
		
		game.addEntity(this, LAYERS.PRIORITY);
	}

	draw()
	{
		if (this.game.game_state !== GAME_STATES.CHANGING_LEVEL) {
			this.animation.drawFrame(this.game.clockTick, this.game._ctx, this.x, this.y, true);
		}
	}

	update()
	{
    if(this.game.game_state === GAME_STATES.CHARACTER_SELECT || this.game.game_state === GAME_STATES.GAME_OVER)
    {
      this.animation = this.menuAnimation;
    }
    else
    {
      this.animation = this.gameAnimation;
    }
  
    if(this.game.clicking)
    {
    		this.animation.setFrame(1);
    }
    else
    {
      this.animation.setFrame(0);
    }
  
		this.x = this.game.mouseX;
		this.y = this.game.mouseY;
	}
}