// Gordon McCreary (January 2020)

/** The standard draw scale that is used across most entities. */
const STANDARD_DRAW_SCALE = [1.75];

/** The radius of the camera bounding box around the player. */
const CAMERA_BOUNDING_BOX = 20;

const DEFAULT_ZOOM = (576 * 480);

/**
 * The Camera class is used to change which part of the map is being viewed.
 */
class Camera {

    /**
     * @param {*} ctx The canvas' 2D context.
     */
    constructor(game, ctx) {
        this._game = game;
        this._x = 0;
        this._y = 0;
        this._ctx = ctx;
        this._width = ctx.canvas.width;
        this._height = ctx.canvas.height;
        this._zoom = DEFAULT_ZOOM;
        this._desiredZoom = DEFAULT_ZOOM;
        this._desiredLoc = {x: this._x, y: this._y};
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

    isOnScreen(pos, width, height, scale) {
        let screenPos = this.drawPosTranslation({x: pos.x, y: pos.y}, 1);
        if ((screenPos.x + (width * scale) < 0
        || screenPos.x - (width * scale) > this._ctx.canvas.width)
        || (screenPos.y + (height * scale) < 0
        || screenPos.y - (height * scale) > this._ctx.canvas.height)) {
            return false;
        } else {
            return true;
        }
    }

    draw(ctx){}
    update() {
      this._ctx.canvas.width = window.innerWidth;
      this._ctx.canvas.height = window.innerHeight;
      this._width = this._ctx.canvas.width;
      this._height = this._ctx.canvas.height;
      this._ctx.webkitImageSmoothingEnabled = false;
      this._ctx.mozImageSmoothingEnabled = false;
      this._ctx.imageSmoothingEnabled = false;
      if (this._zoom !== this._desiredZoom) {
          let zoomSmoothing = 25;
          if (sessionStorage.getItem('fps') === '30') zoomSmoothing = 15;
          if (Math.floor(Math.abs(this._desiredZoom - this._zoom) / zoomSmoothing) < 2) { // {60+: 25, 30: 15}
              this._zoom = Math.floor(this._desiredZoom);
          } else {
              this._zoom += Math.floor((this._desiredZoom - this._zoom) / zoomSmoothing); // {60+: 25, 30: 15}
          }
      }
      if (this._x !== this._desiredLoc.x || this._y !== this._desiredLoc.y) {
          let moveSmoothing = 5;
          if (sessionStorage.getItem('fps') === '30') moveSmoothing = 2;
          if (Math.floor(Math.abs(this._desiredLoc.x - this._x)) < 2) {
              this._x = Math.floor(this._desiredLoc.x);
          } else {
              let t =  (this._desiredLoc.x - this._x) / moveSmoothing; // {60+: 5, 30: 3}
              if (t < 0) {
                  this._x += Math.floor(t);
              } else {
                  this._x += Math.ceil(t);
              }
          }
          if (Math.floor(Math.abs(this._desiredLoc.y - this._y)) < 2) {
              this._y = Math.floor(this._desiredLoc.y);
          } else {
              let t = (this._desiredLoc.y - this._y) / moveSmoothing; // {60+: 5, 30: 3}
              if (t < 0) {
                  this._y += Math.floor(t);
              } else {
                  this._y += Math.ceil(t);
              }
          }
      }
      STANDARD_DRAW_SCALE[0] = Math.sqrt((this._height * this._width) / this._zoom);
    }

    zoomCam(val) {
        this._desiredZoom = Math.floor(val);
    }

    moveCam(point) {
        let p = {x: Math.floor(point.x), y: Math.floor(point.y)};
        this._desiredLoc = p;
    }

    get x() {return this._x;}
    get y() {return this._y;}
    set x(val) {this._x = Math.floor(val); this._desiredLoc.x = Math.floor(val);}
    set y(val) {this._y = Math.floor(val); this._desiredLoc.y = Math.floor(val);}
}