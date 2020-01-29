// Gordon McCreary (January 2020)

/**
 * The Level class is used to generate and represent the current level being
 * played by the main character.
 */
class Level {

    /**
     * @param {string) levelString A string that stores the information for the
     *      requested level. Formatting (all in one line):
     *          first: WIDTHxHEIGHTy            example: 20x15y
     *          second: WALLTYPEwFLOORTYPEf     example: 1w3f
     *          third: Row-major representation of the map
     *              W is a wall.
     *              F is a floor.
     *              S is the spawn point (must be on left border of map).
     *              E is the exit point (must be on right border of map).
     *              H is a horizontal door.
     *              V is a vertical door.
     *       Pass null for a random level.
     */
    constructor(levelString) {
        this.resetLevel(levelString);
    }

    /**
     * @param {string) levelString A string that stores the information for the
     *      requested level. Formatting (all in one line):
     *          first: WIDTHxHEIGHTy            example: 20x15y
     *          second: WALLTYPEwFLOORTYPEf     example: 1w3f
     *          third: Row-major representation of the map
     *              W is a wall.
     *              F is a floor.
     *              S is the spawn point (must be on left border of map).
     *              E is the exit point (must be on right border of map).
     *              H is a horizontal door.
     *              V is a vertical door.
     *       Pass null for a random level.
     */
    buildLevel(string) {
        let seed = string;
        this._width = seed.slice(0, seed.indexOf("x"));
        seed = seed.slice(seed.indexOf("x") + 1, seed.length);
        this._height = seed.slice(0, seed.indexOf("y"));
        seed = seed.slice(seed.indexOf("y") + 1, seed.length);
        this._wallType = seed.slice(0, seed.indexOf("w"));
        seed = seed.slice(seed.indexOf("w") + 1, seed.length);
        this._floorType = seed.slice(0, seed.indexOf("f"));
        seed = seed.slice(seed.indexOf("f") + 1, seed.length);
        for (let i = 0; i < this._width; i++) {
            this._map[i] = [];
        }
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                let type = seed[(this._width * i) + j];
                if (type === "S") {
                    this._spawn = {x: j, y: i};
                }
                if (type === "F") {
                    this._floors.push({x: j, y: i});
                }
                if (type === "W") {
                    this._walls.push({x: j, y: i});
                }
                if (type === "H") {
                    this._doors.push({x: j, y: i, d: "H"});
                }
                if (type === "V") {
                    this._doors.push({x: j, y: i, d: "V"});
                }
                if (type === "E") {
                    this._exit = {x: i, y: j};
                }
                this._map[j][i] = type;
            }
        }
    }

    /**
     * @param {string) levelString A string that stores the information for the
     *      requested level. Formatting (all in one line):
     *          first: WIDTHxHEIGHTy            example: 20x15y
     *          second: WALLTYPEwFLOORTYPEf     example: 1w3f
     *          third: Row-major representation of the map
     *              W is a wall.
     *              F is a floor.
     *              S is the spawn point (must be on left border of map).
     *              E is the exit point (must be on right border of map).
     *              H is a horizontal door.
     *              V is a vertical door.
     *       Pass null for a random level.
     */
    resetLevel(string) {
        this._map = [];
        this._width = null;
        this._height = null;
        this._spawn = null;
        this._floors = [];
        this._walls = [];
        this._doors = [];
        this._exit = null;
        this._wallType = null;
        this._floorType = null;
        this.buildLevel(string);
    }

    /**
     * @param {object} point The indices of the array youd like to access.
     *      Example: {x: 0, y: 0}.
     * @returns {string} Returns the map element at the given indices.
     *      W is a wall.
     *      F is a floor.
     *      S is the spawn point (must be on left border of map).
     *      E is the exit point (must be on right border of map).
     *      H is a horizontal door.
     *      V is a vertical door.
     */
    mapElementAt(point){
        return this._map[point.x][point.y];
    }

    /**
     * @param {num} index An index from the level array.
     * @returns Returns center coordinate of the tile referenced by index.
     */
    indexToCoordinate(index) {
        return index * 96 + 48;
    }
}