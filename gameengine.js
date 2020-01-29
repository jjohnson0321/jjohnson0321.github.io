const DIRECTION_LEFT = "LEFT";
const DIRECTION_RIGHT = "RIGHT";
const DIRECTION_UP = "UP";
const DIRECTION_DOWN = "DOWN";

const GAME_STATES = {
    CHARACTER_SELECT: "char_select",
    PLAYING: "playing_level",
    CHANGING_LEVEL: "changing level"
};

const LAYERS = {
    FLOOR: 0,
    WALL: 1,
    PICKUPS: 2,
    PROJECTILES: 3,
    PCS: 4,
    HUD: 5
};
/**
 * The GameEngine class is the heart our game. It maintains the render-update
 * loop and provides all entities with the resources they need to exist and
 * interact.
 */
class GameEngine {

    /**
     * @param {Camera} camera The camera that's attached to the main character.
     * @param {Level} level The level being played by the main character.
     * @param {characterChooser} The chooser that we are using to pick a character.
     */
    constructor(camera, level) {
        this._camera = camera;
        this._level = level;
        this._entities = [];
        this._entities[0] = []; // Floor & Wall
        this._entities[1] = []; // Enemies
        this._entities[2] = []; // Pickups & Projectiles
        this._entities[3] = []; // Playable Characters
        this._entities[4] = []; // HUD
        this._ctx = null;
		
		this.timers = [];
		this.click = false;
		this.score = 0;
		this.chars = [];
		this.keyStack = [];
		this.lastChar = null;

		this.game_state = GAME_STATES.CHARACTER_SELECT;
    }

    /**
     * Initializes the game.
     * @param {*} ctx The HTML canvas' 2D context.
     */
    init(ctx) {
        this._ctx = ctx;
        this._surfaceWidth = this._ctx.canvas.width;
        this._surfaceHeight = this._ctx.canvas.height;
        this.startInput();
        this._clock = new Clock();
    }

    /**
     * Starts the render-update loop.
     */
    start() {
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that._ctx.canvas);
        })();
    }

    /**
    * Initializes all event listeners for user input.
    */
    startInput = Input; 

    /**
     * Adds the given entity to the list of entities in the requested layer.
     * @param {*} entity The entity to be added.
     * @param {number | string} layer The entity destination layer.
     *      Pass 0 or "floor" for layer 0 (floor & wall tiles);
     *      Pass 1 or "enemy" for layer 1 (enemies);
     *      Pass 2 or "pps" for layer 2 (projectiles and pickups);
     *      Pass 3 or "main" for layer 3 (playable characters);
     *      Pass 4 or "hud" for layer 4 (HUD);
     */
    addEntity(entity, layer) {
		entity.layer = layer;
		let choice = -1; // if an entity is added without a proper layer this will throw an error.
        if (typeof(layer) === "string") {
            if ("floor" === layer) {
				choice = 0;
            } else if ("enemy" === layer) {
				choice = 1;
            } else if ("pps" === layer) {
				choice = 2;
            } else if ("main" === layer) {
				choice = 3;
            } else if ("hud" === layer) {
				choice = 4;
            } else {
                throw "Invalid layer string parameter.";
            }
			
			entity.id = this._entities[choice].length;
			this._entities[choice].push(entity);

			
        } else if (typeof(layer) === "number") {
            if (layer === Math.floor(layer) && layer >= 0 && layer < 5) {
                this._entities[layer].push(entity);
            } else {
                throw "Invalid layer number parameter.";
            }
        } else {
            throw "Incorrect layer parameter type.";
        }
		
		//console.log("CREATED ENTITY");
    }
	
	removeEntity (entity, layer) {
		this.entities[layer][entity.id] = this.entities[layer][this.entities[layer].length-1];
		this.entities[layer][entity.id].id = entity.id;
		this.entities[layer][this.entities[layer].length-1] = entity;
		this.entities[layer].pop();
	}
	
	addTimer(timer) {
		timer.id = this.timers.length;
		this.timers.push(timer);
	}
	
	removeTimer(timer) {
		this.timers[timer.id] = this.timers[this.timers.length-1];
		this.timers[timer.id].id = timer.id;
		this.timers[this.timers.length-1] = timer;
		this.timers.pop();
	}

	setPlayer(player) {
		this.player = player;
	}

	setAssetManager(manager) {
		this.AM = manager;
	}
	

    /**
    * Calls draw() on every entity in memory.
    */
    draw() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        this._ctx.save();
        for (let i = 0; i < this._entities.length; i++) {
            for (let j = 0; j < this._entities[i].length; j++) {
                this._entities[i][j].draw(this._ctx);
            }
        }
		
        this._ctx.restore();
    }

    /**
     * Calls update() on every entity while disposing of entities that aren't
     * needed anymore.
     */
    update() {

        switch (this.game_state) {
            case GAME_STATES.CHARACTER_SELECT:
                var i = 0;
                for(i = 0; i < this._entities[0].length; i++)
                {
                    if(this.entities[0][i].removeFromWorld)
                    {
                        this.removeEntity(this.entities[0][i], 0);
                        continue;
                    }
                    this.entities[0][i].update();
                }
                for (i = 0; i < this.entities[3].length; i++) {
                    if(this.entities[3][i].removeFromWorld)
                    {
                        this.removeEntity(this.entities[3][i], 3);
                        continue;
                    }
                    this.entities[3][i].update();
                }
                for(i = 0; i < this._entities[4].length; i++)
                {
                    if(this.entities[4][i].removeFromWorld)
                    {
                        this.removeEntity(this.entities[4][i], 4);
                        continue;
                    }
                    this.entities[4][i].update();
                }
                this.click = false;

                break;
            case GAME_STATES.PLAYING:
                for (var i = 0; i < this._entities.length; i++) {
                    let entityCount = this._entities[i].length;
                    for(var j = 0; j < entityCount; j++)
                    {
                        if(this.entities[i][j].removeFromWorld)
                        {
                            this.removeEntity(this.entities[i][j], i);
                            entityCount = this.entities[i].length;
                            j--;
                            continue;
                        }

                        this.entities[i][j].update();
                    }
                }

                var timersCount = this.timers.length;

                for (var i = 0; i < timersCount; i++)
                {
                    let tim = this.timers[i];
                    if(tim.removeFromWorld)
                    {
                        this.removeTimer(tim);
                        timersCount = this.timers.length;
                        i--;
                        continue;
                    }
                    this.timers[i].update();
                }

                break;
        }

        // Clear input
        this._clicks = [];

    }

    /**
    * Loops while calling update() and draw().
    */
    loop() {
        this._clockTick = this._clock.tick();
        this.update();
        this.draw();
    }

    // Getters and setters.
    get camera() {return this._camera;}
    get level() {return this._level;}
    get entities() {return this._entities;}
    get ctx() {return this._ctx;}
}

// Used in start() to cap framerate.
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();