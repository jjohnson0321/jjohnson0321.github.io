// Gordon McCreary (January 2020)

/**
 * The Floor class is used to draw all the types of floors.
 */
class Floor {

    /**
     * @param {GameEngine} game The game engine that this entity exists in.
     */
    constructor(game) {
        this._game = game;
        game.addEntity(this, "floor");
        this._level = game._level;
        this._spritesheet = ASSET_MANAGER.getAsset("./img/map/grounds.png");
        this._removeFromWorld = false;
        this._dirtFloor = new Animation(this._spritesheet, 128, 128, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._stoneFloor = new Animation(this._spritesheet, 128, 128, {x: 1, y: 0}, {x: 1, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._tileFloor = new Animation(this._spritesheet, 128, 128, {x: 2, y: 0}, {x: 2, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._woodFloor = new Animation(this._spritesheet, 128, 128, {x: 3, y: 0}, {x: 3, y: 0}, 0, true, STANDARD_DRAW_SCALE);
    }

    /**
     * Mandatory draw method; called by the GameEngine to draw the entity.
     * @param {*} ctx The canvas' 2D context.
     */
    draw(ctx) {
        let drawFloor = (pos) => {
            if (this._level._floorType === "0") {
                this._dirtFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._level._floorType === "1") {
                this._stoneFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._level._floorType === "2") {
                this._tileFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else {
                this._woodFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            }
        };

        for (let i = 0; i < this._level._floors.length; i++) {
            drawFloor(this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(this._level._floors[i].x),
                    y: this._level.indexToCoordinate(this._level._floors[i].y)}, 1));
        }
        for (let i = 0; i < this._level._doors.length; i++) {
            drawFloor(this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(this._level._doors[i].x),
                    y: this._level.indexToCoordinate(this._level._doors[i].y)}, 1));
        }
        drawFloor(this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(this._level._spawn.x),
                y: this._level.indexToCoordinate(this._level._spawn.y)}, 1));
        drawFloor(this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(this._level._exit.x),
                y: this._level.indexToCoordinate(this._level._exit.y)}, 1));
    }

    /**
     * Mandatory update method; called by the GameEngine to update the entity.
     */
    update() {}
}