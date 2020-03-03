class ChooseYourFighter extends Entity{
    constructor(game) {
        super(game, -128, indexToCoordinate(game.sceneManager.level.spawn.y - 1.5));
        this.myScale = [STANDARD_DRAW_SCALE[0] * 4];
		this.myAddScale = this.myScale / STANDARD_DRAW_SCALE[0];
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/ChooseYourFighter.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            12, true, this.myScale);
        this.animation.unpause();
    }
    update() {
        this.myScale[0] = this.myAddScale * STANDARD_DRAW_SCALE[0];
    }
}