class WoodDragon extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);

        game.addEntity()
    }
}

class WoodDragonHead extends Enemy {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        this.breathAnimation = new Animation(ASSET_MANAGER.getAsset("./img/enemies/WoodDragon/WoodDragonHeadBreathWeapon"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH * 2,
            {x:0, y: 0}, {x: 1, y: 0},
            4, false, this.myScale);

        this.breathAnimation = new Animation(ASSET_MANAGER.getAsset("./img/enemies/WoodDragon/WoodDragonHeadBreathWeapon"),
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH * 2,
            {x:0, y: 0}, {x: 1, y: 0},
            4, false, this.myScale);
    }

    update() {
        super.update();

        this.myScale[0] = STANDARD_DRAW_SCALE;


    }
}