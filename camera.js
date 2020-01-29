// Gordon McCreary (January 2020)

/** The standard draw scale that is used across most entities. */
const STANDARD_DRAW_SCALE = [1.75];

/** The radius of the camera bounding box around the player. */
const CAMERA_BOUNDING_BOX = 20;

/**
 * The Camera class is used to change which part of the map is being viewed.
 */
class Camera {

    /**
     * @param {*} ctx The canvas' 2D context.
     */
    constructor(ctx) {
        this._x = 0;
        this._y = 0;
        this._ctx = ctx;
        this._width = ctx.canvas.width;
        this._height = ctx.canvas.height;
    }

    /**
     * Translates game map position into drawing position based on scale.
     * @param {object} point The {x: #, y: #} point that will be translated.
     * @param {number} zScale Number scale for additional z-axis scaling.
     * @returns {object} Returns the {x: #, y: #} point of where to draw on the
     *      canvas.
     */
    drawPosTranslation(point, zScale) {
        return {x: (point.x - this._x) * STANDARD_DRAW_SCALE[0] * zScale + (this._width / 2),
                y: (point.y - this._y) * STANDARD_DRAW_SCALE[0] * zScale + (this._height / 2)};
    }

    /**
     * Translates a point on the canvas to a point in the game world.
     * @param {object} point The {x: #, y: #} point that will be translated.
     * @returns {object} Returns the {x: #, y: #} point in the game world.
     */
    clickPosTranslation(point) {
        return {x: ((point.x - (this._width / 2)) / STANDARD_DRAW_SCALE[0]) + this._x,
                y: ((point.y - (this._height / 2)) / STANDARD_DRAW_SCALE[0]) + this._y};
    }

    draw(ctx){}
    update(){
        this._ctx.canvas.width = window.innerWidth;
        this._ctx.canvas.height = window.innerHeight;
        this._width = this._ctx.canvas.width;
        this._height = this._ctx.canvas.height;
        this._ctx.webkitImageSmoothingEnabled = false;
        this._ctx.mozImageSmoothingEnabled = false;
        this._ctx.imageSmoothingEnabled = false;
        STANDARD_DRAW_SCALE[0] = Math.sqrt((this._height * this._width) / (768 * 576));
    }

    get x() {return this._x;}
    get y() {return this._y;}
    set x(val) {this._x = val;}
    set y(val) {this._y = val;}
}