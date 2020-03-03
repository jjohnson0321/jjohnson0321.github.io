class Tutorial extends Entity {
    constructor(game) {
        super(game, STANDARD_ENTITY_FRAME_WIDTH * 4, STANDARD_ENTITY_FRAME_WIDTH * 2);
		this.myScale = [STANDARD_DRAW_SCALE[0] * 4];
		this.myAddScale = this.myScale / STANDARD_DRAW_SCALE[0];
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ControllerTutorial.png"),
            STANDARD_ENTITY_FRAME_WIDTH * 2, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 7, y: 0},
            4, true, this.myScale);

        let that = this;
        this.timerCallback = new TimerCallback(game, 10, false,
            function() {
                that.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ChangeDoorsWallsButtons.png"),
                    STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
                    {x: 0, y: 0}, {x: 5, y: 0},
                    4, true, this.myScale);
            });
    }
	
	update()
	{
		this.myScale[0] = this.myAddScale * STANDARD_DRAW_SCALE[0];
	}
}