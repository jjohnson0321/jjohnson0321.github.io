// Gordon McCreary (January 2020)

/** The additional scaling of layer 1. */
const PIT_4_SCALE = [1.03 * STANDARD_DRAW_SCALE];

/** The additional scaling of layer 2. */
const PIT_3_SCALE = [1.06 * STANDARD_DRAW_SCALE];

/** The additional scaling of layer 3. */
const PIT_2_SCALE = [1.09 * STANDARD_DRAW_SCALE];

/** The additional scaling of layer 3. */
const PIT_1_SCALE = [1.12 * STANDARD_DRAW_SCALE];

/**
 * The Floor class is used to draw all the types of floors.
 */
class Floor {

    /**
     * @param {GameEngine} game The game engine that this entity exists in.
     */
    constructor(game) {
        this._game = game;
        game.addEntity(this, LAYERS.FLOOR);
        this._spritesheet = ASSET_MANAGER.getAsset("./img/map/grounds.png");
        this._pitSheet = ASSET_MANAGER.getAsset("./img/map/pit.png");
        this._removeFromWorld = false;
        this._dirtFloor = new Animation(this._spritesheet, 128, 128, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._stoneFloor = new Animation(this._spritesheet, 128, 128, {x: 1, y: 0}, {x: 1, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._tileFloor = new Animation(this._spritesheet, 128, 128, {x: 2, y: 0}, {x: 2, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._woodFloor = new Animation(this._spritesheet, 128, 128, {x: 3, y: 0}, {x: 3, y: 0}, 0, true, STANDARD_DRAW_SCALE);
        this._dirtSpawn = new Animation(this._spritesheet, 128, 128, {x: 0, y: 1}, {x: 0, y: 1}, 0, true, STANDARD_DRAW_SCALE);
        this._stoneSpawn = new Animation(this._spritesheet, 128, 128, {x: 1, y: 1}, {x: 1, y: 1}, 0, true, STANDARD_DRAW_SCALE);
        this._tileSpawn = new Animation(this._spritesheet, 128, 128, {x: 2, y: 1}, {x: 2, y: 1}, 0, true, STANDARD_DRAW_SCALE);
        this._woodSpawn = new Animation(this._spritesheet, 128, 128, {x: 3, y: 1}, {x: 3, y: 1}, 0, true, STANDARD_DRAW_SCALE);
        this._dirtExit = new Animation(this._spritesheet, 128, 128, {x: 0, y: 2}, {x: 0, y: 2}, 0, true, STANDARD_DRAW_SCALE);
        this._stoneExit = new Animation(this._spritesheet, 128, 128, {x: 1, y: 2}, {x: 1, y: 2}, 0, true, STANDARD_DRAW_SCALE);
        this._tileExit = new Animation(this._spritesheet, 128, 128, {x: 2, y: 2}, {x: 2, y: 2}, 0, true, STANDARD_DRAW_SCALE);
        this._woodExit = new Animation(this._spritesheet, 128, 128, {x: 3, y: 2}, {x: 3, y: 2}, 0, true, STANDARD_DRAW_SCALE);

        this._pit1 = new Animation(this._pitSheet, 128, 128, {x: 3, y: 0}, {x: 3, y: 0}, 0, true, PIT_1_SCALE);
        this._pit2 = new Animation(this._pitSheet, 128, 128, {x: 2, y: 0}, {x: 2, y: 0}, 0, true, PIT_2_SCALE);
        this._pit3 = new Animation(this._pitSheet, 128, 128, {x: 1, y: 0}, {x: 1, y: 0}, 0, true, PIT_3_SCALE);
        this._pit4 = new Animation(this._pitSheet, 128, 128, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, PIT_4_SCALE);
    }

    /**
     * Mandatory draw method; called by the GameEngine to draw the entity.
     * @param {*} ctx The canvas' 2D context.
     */
    draw(ctx) {

        

        let drawFloor = (pos) => {
            if (this._game._sceneManager.level._floorType === 0) {
                this._dirtFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._game._sceneManager.level._floorType === 1) {
                this._stoneFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._game._sceneManager.level._floorType === 2) {
                this._tileFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else {
                this._woodFloor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            }
        };

        let drawPit = (pos, layer) => {
            if (layer === 1) {
                this._pit1.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (layer === 2) {
                this._pit2.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (layer === 3) {
                this._pit3.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else {
                this._pit4.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            }
        }


        // Drawing any pits.
        for (let i = 1; i < 5; i++) {
            for (let j = 0; j < this._game._sceneManager.level._pits.length; j++) {
                let check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x - 1, y: this._game._sceneManager.level._pits[j].y});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x - 1), 
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x - 1),
                            y: indexToCoordinate(this._game._sceneManager.level._pits[j].y)},
                            1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x + 1, y: this._game._sceneManager.level._pits[j].y});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x + 1),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x + 1),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x, y: this._game._sceneManager.level._pits[j].y - 1});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y - 1)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y - 1)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x, y: this._game._sceneManager.level._pits[j].y + 1});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y + 1)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y + 1)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x - 1, y: this._game._sceneManager.level._pits[j].y - 1});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x - 1),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y - 1)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x - 1),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y - 1)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x + 1, y: this._game._sceneManager.level._pits[j].y - 1});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x + 1),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y - 1)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x + 1),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y - 1)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x - 1, y: this._game._sceneManager.level._pits[j].y + 1});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x - 1),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y + 1)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x - 1),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y + 1)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
                check = this._game._sceneManager.level.mapElementAt({x: this._game._sceneManager.level._pits[j].x + 1, y: this._game._sceneManager.level._pits[j].y + 1});
                if (check !== null && check !== "P"
                && this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x + 1),
                y: indexToCoordinate(this._game._sceneManager.level._pits[j].y + 1)}, 256, 256, STANDARD_DRAW_SCALE * (1 - (.03 * (5 - i)) / 1.75))) {
                    drawPit(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._pits[j].x + 1),
                        y: indexToCoordinate(this._game._sceneManager.level._pits[j].y + 1)}, 
                        1 - (STANDARD_DRAW_SCALE * ((.03 * (5 - i)) / 1.75))), i);
                }
            }
        }

        for (let i = 0; i < this._game._sceneManager.level._floors.length; i++) {
            if (this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._floors[i].x), y: indexToCoordinate(this._game._sceneManager.level._floors[i].y)}, 96, 96, STANDARD_DRAW_SCALE)) {
                drawFloor(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._floors[i].x),
                        y: indexToCoordinate(this._game._sceneManager.level._floors[i].y)}, 1));
            }
        }
        for (let i = 0; i < this._game._sceneManager.level._doors.length; i++) {
            if (this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._doors[i].x), y: indexToCoordinate(this._game._sceneManager.level._doors[i].y)}, 96, 96, STANDARD_DRAW_SCALE)) {
                drawFloor(this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._doors[i].x),
                        y: indexToCoordinate(this._game._sceneManager.level._doors[i].y)}, 1));
            }
        }
        if (this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level.spawn.x), y: indexToCoordinate(this._game._sceneManager.level.spawn.y)}, 96, 96, STANDARD_DRAW_SCALE)) {
            let pos = this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level.spawn.x),
                y: indexToCoordinate(this._game._sceneManager.level.spawn.y)}, 1);
            if (this._game._sceneManager.level._floorType === 0) {
                this._dirtSpawn.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._game._sceneManager.level._floorType === 1) {
                this._stoneSpawn.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._game._sceneManager.level._floorType === 2) {
                this._tileSpawn.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else {
                this._woodSpawn.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            }
        }
        if (this._game._camera.isOnScreen({x: indexToCoordinate(this._game._sceneManager.level._exit.x), y: indexToCoordinate(this._game._sceneManager.level._exit.y)}, 96, 96, STANDARD_DRAW_SCALE)) {
            let pos = this._game._camera.drawPosTranslation({x: indexToCoordinate(this._game._sceneManager.level._exit.x),
                y: indexToCoordinate(this._game._sceneManager.level._exit.y)}, 1);
            if (this._game._sceneManager.level._floorType === 0) {
                this._dirtExit.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._game._sceneManager.level._floorType === 1) {
                this._stoneExit.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else if (this._game._sceneManager.level._floorType === 2) {
                this._tileExit.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            } else {
                this._woodExit.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
            }
        }
    }

    /**
     * Mandatory update method; called by the GameEngine to update the entity.
     */
    update() {
        PIT_4_SCALE[0] = ((1 - STANDARD_DRAW_SCALE * (.03 / 1.75)) * STANDARD_DRAW_SCALE);
        PIT_3_SCALE[0] = ((1 - STANDARD_DRAW_SCALE * (.06 / 1.75)) * STANDARD_DRAW_SCALE);
        PIT_2_SCALE[0] = ((1 - STANDARD_DRAW_SCALE * (.09 / 1.75)) * STANDARD_DRAW_SCALE);
        PIT_1_SCALE[0] = ((1 - STANDARD_DRAW_SCALE * (.12 / 1.75)) * STANDARD_DRAW_SCALE);
    }
}