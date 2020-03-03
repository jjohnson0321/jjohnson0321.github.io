class HoverArrow extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/hud/HoverArrow.png"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            9, true, STANDARD_DRAW_SCALE);
    }
}