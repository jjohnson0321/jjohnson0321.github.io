// Gordon McCreary (January 2020)

/**
 * The Wall class is used to draw all the types of walls.
 */
class Wall {

    /**
     * @param {GameEngine} game The game engine that this entity exists in.
     */
    constructor(game) {
        this._game = game;
        this._game.addEntity(this, "floor");
        this._level = this._game._level;
        this._wallSheet = ASSET_MANAGER.getAsset("./img/map/walls.png");
        this._removeFromWorld = false;

        this._outsideWall0 = new Animation(this._wallSheet, 128, 128, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._insideWall0 = new Animation(this._wallSheet, 128, 128, {x: 0, y: 1}, {x: 0, y: 1}, 0, true, STANDARD_DRAW_SCALE);
    }

    /**
     * Mandatory draw method; called by the GameEngine to draw the entity.
     * @param {*} ctx The canvas' 2D context.
     */
    draw(ctx) {
        let drawWall = (pos) => {
            if (this._level._wallType === "0") {
                this._outsideWall0.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else {
                this._insideWall0.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            }
        };
        for (let i = 0; i < this._level._walls.length; i++) {
            drawWall(this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(this._level._walls[i].x),
                    y: this._level.indexToCoordinate(this._level._walls[i].y)}, 1));
        }
    }

    /**
     * Mandatory update method; called by the GameEngine to update the entity.
     */
    update() {}
}