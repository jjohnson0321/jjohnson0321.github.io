// Gordon McCreary (January 2020)

/** The additional scaling of layer 1. */
const WALL_1_SCALE = [1.04 * STANDARD_DRAW_SCALE];

/** The additional scaling of layer 2. */
const WALL_2_SCALE = [1.08 * STANDARD_DRAW_SCALE];

/** The additional scaling of layer 3. */
const WALL_3_SCALE = [1.12 * STANDARD_DRAW_SCALE];

/**
 * The Wall class is used to draw all the types of walls and doors.
 */
class WallHUD {

    /**
     * @param {GameEngine} game The game engine that this entity exists in.
     */
    constructor(game) {
        this._game = game;
        this._game.addEntity(this, "hud");
        this._level = this._game._level;
        this._wallSheet = ASSET_MANAGER.getAsset("./img/map/walls.png");
        this._doorSheet = ASSET_MANAGER.getAsset("./img/map/doors.png");
        this._removeFromWorld = false;

        this._outsideWall1 = new Animation(this._wallSheet, 128, 128, {x: 1, y: 0}, {x: 1, y: 0}, 0, true, WALL_1_SCALE);
        this._insideWall1 = new Animation(this._wallSheet, 128, 128, {x: 1, y: 1}, {x: 1, y: 1}, 0, true, WALL_1_SCALE);

        this._outsideWall2 = new Animation(this._wallSheet, 128, 128, {x: 2, y: 0}, {x: 2, y: 0}, 0, true, WALL_2_SCALE);
        this._insideWall2 = new Animation(this._wallSheet, 128, 128, {x: 2, y: 1}, {x: 2, y: 1}, 0, true, WALL_2_SCALE);
        this._outsideVDoor = new Animation(this._doorSheet, 128, 128, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, WALL_2_SCALE);
        this._outsideHDoor = new Animation(this._doorSheet, 128, 128, {x: 1, y: 0}, {x: 1, y: 0}, 0, true, WALL_2_SCALE);
        this._insideVDoor2 = new Animation(this._doorSheet, 128, 128, {x: 0, y: 1}, {x: 0, y:1}, 0, true, WALL_2_SCALE);
        this._insideHDoor2 = new Animation(this._doorSheet, 128, 128, {x: 1, y: 1}, {x: 1, y: 1}, 0, true, WALL_2_SCALE);

        this._outsideWall3 = new Animation(this._wallSheet, 128, 128, {x: 3, y: 0}, {x: 3, y: 0}, 0, true, WALL_3_SCALE);
        this._insideWall3 = new Animation(this._wallSheet, 128, 128, {x: 3, y: 1}, {x: 3, y: 1}, 0, true, WALL_3_SCALE);
    }

    /**
     * Mandatory draw method; called by the GameEngine to draw the entity.
     * @param {*} ctx The canvas' 2D context.
     */
    draw(ctx) {
        let drawWall = (pos, layer) => {
            if (this._level._wallType === "0") {
                if (layer === 1) {
                    this._outsideWall1.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                } else if (layer === 2) {
                    this._outsideWall2.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                } else {
                    this._outsideWall3.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                }
            } else {
                if (layer === 1) {
                    this._insideWall1.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                } else if (layer === 2) {
                    this._insideWall2.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                } else {
                    this._insideWall3.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                }
            }
        };
        let drawDoor = (pos, dir) => {
            if (this._level._wallType === "0") {
                if (dir === "H") {
                    this._outsideHDoor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                } else {
                    this._outsideVDoor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                }
            } else {
                if (dir === "H") {
                    this._insideHDoor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                } else {
                    this._insideVDoor.drawFrame(this._game._clockTick, ctx, pos.x, pos.y, true);
                }
            }
        };

        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < this._level._walls.length; j++) {
                drawWall(this._game._camera.drawPosTranslation({
                        x: this._level.indexToCoordinate(this._level._walls[j].x),
                        y: this._level.indexToCoordinate(this._level._walls[j].y)},
                        (STANDARD_DRAW_SCALE * ((.04 * i) / 1.75)) + 1), i);
            }
            if (i == 2) {
                for (let k = 0; k < this._level._doors.length; k++) {
                    drawDoor(this._game._camera.drawPosTranslation({
                            x: this._level.indexToCoordinate(this._level._doors[k].x),
                            y: this._level.indexToCoordinate(this._level._doors[k].y)},
                            (STANDARD_DRAW_SCALE * ((.04 * i) / 1.75)) + 1), this._level._doors[k].d);
                }
            }
        }
        

        // Layer 1.
        /*for (let i = 0; i < this._level._map.length; i++) {
            for (let j = 0; j < this._level._map[i].length; j++) {
                let tile = this._level._map[i][j];
                if (tile === "W" || tile === "H" || tile === "V") {
                    let pos1 = this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(i), y: this._level.indexToCoordinate(j)}, (STANDARD_DRAW_SCALE * (.04 / 1.75)) + 1);
                    if (this._level._wallType === "0") {
                        if (tile === "W") this._outsideWall1.drawFrame(this._game._clockTick, ctx, pos1.x, pos1.y, true);
                        if (tile === "H") this._outsideHDoor1.drawFrame(this._game._clockTick, ctx, pos1.x, pos1.y, true);
                        if (tile === "V") this._outsideVDoor1.drawFrame(this._game._clockTick, ctx, pos1.x, pos1.y, true);
                    } else {
                        if (tile === "W") this._insideWall1.drawFrame(this._game._clockTick, ctx, pos1.x, pos1.y, true);
                        if (tile === "H") this._insideHDoor1.drawFrame(this._game._clockTick, ctx, pos1.x, pos1.y, true);
                        if (tile === "V") this._insideVDoor1.drawFrame(this._game._clockTick, ctx, pos1.x, pos1.y, true);
                    }
                }
            }
        }

        // Layer 2.
        for (let i = 0; i < this._level._map.length; i++) {
            for (let j = 0; j < this._level._map[i].length; j++) {
                let tile = this._level._map[i][j];
                if (tile === "W" || tile === "H" || tile === "V") {
                    let pos2 = this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(i), y: this._level.indexToCoordinate(j)}, (STANDARD_DRAW_SCALE * (.08 / 1.75)) + 1);
                    if (this._level._wallType === "0") {
                        if (tile === "W") this._outsideWall2.drawFrame(this._game._clockTick, ctx, pos2.x, pos2.y, true);
                        if (tile === "H") this._outsideHDoor2.drawFrame(this._game._clockTick, ctx, pos2.x, pos2.y, true);
                        if (tile === "V") this._outsideVDoor2.drawFrame(this._game._clockTick, ctx, pos2.x, pos2.y, true);
                    } else {
                        if (tile === "W") this._insideWall2.drawFrame(this._game._clockTick, ctx, pos2.x, pos2.y, true);
                        if (tile === "H") this._insideHDoor2.drawFrame(this._game._clockTick, ctx, pos2.x, pos2.y, true);
                        if (tile === "V") this._insideVDoor2.drawFrame(this._game._clockTick, ctx, pos2.x, pos2.y, true);
                    }
                }
            }
        }

        // Layer 3.
        for (let i = 0; i < this._level._map.length; i++) {
            for (let j = 0; j < this._level._map[i].length; j++) {
                let tile = this._level._map[i][j];
                if (tile === "W" || tile === "H" || tile === "V") {
                    let pos3 = this._game._camera.drawPosTranslation({x: this._level.indexToCoordinate(i), y: this._level.indexToCoordinate(j)}, (STANDARD_DRAW_SCALE * (.12 / 1.75)) + 1);
                    if (this._level._wallType === "0") {
                        if (tile === "W") this._outsideWall3.drawFrame(this._game._clockTick, ctx, pos3.x, pos3.y, true);
                        if (tile === "H") this._outsideHDoor3.drawFrame(this._game._clockTick, ctx, pos3.x, pos3.y, true);
                        if (tile === "V") this._outsideVDoor3.drawFrame(this._game._clockTick, ctx, pos3.x, pos3.y, true);
                    } else {
                        if (tile === "W") this._insideWall3.drawFrame(this._game._clockTick, ctx, pos3.x, pos3.y, true);
                        if (tile === "H") this._insideHDoor3.drawFrame(this._game._clockTick, ctx, pos3.x, pos3.y, true);
                        if (tile === "V") this._insideVDoor3.drawFrame(this._game._clockTick, ctx, pos3.x, pos3.y, true);
                    }
                }
            }
        }*/
    }

    /**
     * Mandatory update method; called by the GameEngine to update the entity.
     */
    update() {
        WALL_1_SCALE[0] = ((STANDARD_DRAW_SCALE * (.04 / 1.75) + 1) * STANDARD_DRAW_SCALE);
        WALL_2_SCALE[0] = ((STANDARD_DRAW_SCALE * (.08 / 1.75) + 1) * STANDARD_DRAW_SCALE);
        WALL_3_SCALE[0] = ((STANDARD_DRAW_SCALE * (.12 / 1.75) + 1) * STANDARD_DRAW_SCALE);
    }
}