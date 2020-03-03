// Gordon McCreary (January 2020)

const MAP_TILES = {
    FLOOR: "-",
    WALL: "#",
    PIT: "P",
    VERTICAL_DOOR: "V",
    HORIZONTAL_DOOR: "H",
    VERTICAL_SPECIAL_DOOR: "^",
    HORIZONTAL_SPECIAL_DOOR: "~",
    SPAWN: "S",
    EXIT: "E",
};

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
     * @param {array} spawners An array of spawner objects
     */
    constructor(game, level) {
		this.game = game;
		this.levelFile = level;
		this.resetLevel(level);
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
        //Note: This should probably be _height.
        for (let i = 0; i < this._width; i++) {
            this._map[i] = [];
        }
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                let type = seed[(this._width * i) + j];
                if (type === MAP_TILES.SPAWN) {
                    this._spawn = {x: j, y: i};
                }
                if (type === MAP_TILES.FLOOR) {
                    this._floors.push({x: j, y: i});
                }
                if (type === MAP_TILES.WALL) {
                    this._walls.push({x: j, y: i});
                }
                if (type === MAP_TILES.PIT) {
                    this._pits.push({x: j, y: i});
                }
                if (type === MAP_TILES.HORIZONTAL_DOOR) {
                    this._doors.push({x: j, y: i, d: "H"});
                }
                if (type === MAP_TILES.VERTICAL_DOOR) {
                    this._doors.push({x: j, y: i, d: "V"});
                }
                if (type === MAP_TILES.HORIZONTAL_SPECIAL_DOOR) {
                    this._doors.push({x: j, y: i, d: "~"});
                }
                if (type === MAP_TILES.VERTICAL_SPECIAL_DOOR) {
                    this._doors.push({x: j, y: i, d: "^"});
                }
                if (type === MAP_TILES.EXIT) {
                    this._exit = {x: j, y: i};
                }
                this._map[j][i] = type;
            }
        }
        let that = this;
        if (this.unlockableCharacter) {
            this.unlockableCharacter.forEach(function (elem)
            {
                console.log(elem.characterClass);
                new PCRemnant(that.game, indexToCoordinate(elem.x), indexToCoordinate(elem.y), elem.characterClass, elem.characterClass.animation.dmgFromRight);
            });
        }

		let roomSpawnerList = [];
		this.roomSpawners.forEach(function (elem)
		{
			roomSpawnerList.push(new RoomSpawner(that.game, elem.x, elem.y, [], elem.room, elem.lockCam, elem.dropKey, elem.dropPotion, elem.zoom));
		});
    console.log(roomSpawnerList);
    this.spawners.forEach(function (elem)
    {
      let owner = null;
      if(elem.roomNum > 0)
      {
        owner = roomSpawnerList[elem.roomNum - 1];
      }
      let s = new Spawner(that.game, elem.x, elem.y, elem.max, elem.freq, elem.list, elem.rand, elem.radius, elem.total, owner, elem.delay);
      if(owner !== null)
      {
        owner.spawners.push(s);
      }
    });
        this.pickups.forEach(function (elem)
        {
                new elem.type.constructor(that.game, indexToCoordinate(elem.x), indexToCoordinate(elem.y));
            });
        this.turrets.forEach(function (elem)
        {
          new Turret(that.game, elem.x, elem.y, elem.fireRate, elem.spinning, elem.cross, elem.pSpeed, elem.pLifeTime, elem.pDirection, elem.pMove, elem.pEasing, elem.initialDelay, elem.burstDelay, elem.burstNum);
        });
        this.spawnerProjectiles.forEach(function (elem)
        {
          let a = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/Fireball.png"),
            16, 16,
            {x: 0, y: 0}, {x: 3, y: 0},
            6, true, STANDARD_DRAW_SCALE);
          new SpawnerProjectile(that.game, elem.x, elem.y, elem.dir, elem.speed, elem.lifeTime, elem.dieOnHit, elem.owner, a, elem.dmg, elem.radius, elem.knockback, elem.move, elem.easing, elem.timeToSpawn, elem.attach, elem.shots, elem.circleTime, elem.loop, elem.spawnDirections);
        });
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
     * @param {array} spawners An array of spawner objects.
     */
    resetLevel(levelFile) {
        this._map = [];
        this._width = levelFile.width;
        this._height = levelFile.height;

        this._spawn = null;
        this._floors = [];
        this._walls = [];
        this._doors = [];
        this._pits = [];

        this._exit = null;
        this._wallType = levelFile.wallType;
        this._floorType = levelFile.floorType;
        this.unlockableCharacter = levelFile.unlockableCharacter;
        this.roomSpawners = levelFile.roomSpawnerList;
        this.spawners = levelFile.spawnerList;
        this.pickups = levelFile.pickupList;
        this.turrets = levelFile.turretList;
        this.spawnerProjectiles = levelFile.spawnerProjectileList;
        this.buildLevel(levelFile.layout);
        if (levelFile.playerSpawner !== null && levelFile.playerSpawner !== undefined) {
            new PlayerSpawner(this.game, levelFile.playerSpawner.maxAtOnce, levelFile.playerSpawner.spawnList, levelFile.playerSpawner.probs);
        }
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
        if (point.x >= 0 && point.y >= 0 && point.x < this._width && point.y < this._height) {
            return this._map[point.x][point.y];
        }
        return null;
    }

    move(collider, prevPos, newPos) {
        if (this.mapElementAt({x: coordinateToIndex(newPos.x), y: coordinateToIndex(newPos.y)}) === MAP_TILES.PIT) {
            return "pitfall";
        }
        let updatedPos = newPos;
        let origin = {x: coordinateToIndex(prevPos.x), y: coordinateToIndex(prevPos.y)};

        // Center
        if (this.mapElementAt({x: origin.x, y: origin.y}) === "#") {
            let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                collider,
                {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                new Collider(0, 0, 48, 48, 48, 48, null, Infinity));
            updatedPos.x = c.pos1.x;
            updatedPos.y = c.pos1.y;
        } else if (this.mapElementAt({x: origin.x, y: origin.y}) === "H") {
            if (this.game.player.keys
                && checkCollision({x: updatedPos.x, y: updatedPos.y},
                collider,
                {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                new Collider(0, 0, 48, 48, 8, 8, null, Infinity))) {
                    this._map[origin.x][origin.y] = "-";
                    var removeDoor = -1;
                    for (var i = 0; i < this._doors.length; i++) {
                        if (this._doors[i].d === "H" && this._doors[i].x === origin.x && this._doors[i].y === origin.y) {
                            removeDoor = i;
                        }
                    }
                    this._doors.splice(removeDoor, 1);
                    this._floors.push({x: origin.x, y: origin.y});
                    this.game.player.keys -= 1;
            } else {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 48, 48, 8, 8, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        } else if (this.mapElementAt({x: origin.x, y: origin.y}) === "V") {
            if (this.game.player.keys
                && checkCollision({x: updatedPos.x, y: updatedPos.y},
                collider,
                {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                new Collider(0, 0, 8, 8, 48, 48, null, Infinity))) {
                    this._map[origin.x][origin.y] = "-";
                    var removeDoor = -1;
                    for (var i = 0; i < this._doors.length; i++) {
                        if (this._doors[i].d === "V" && this._doors[i].x === origin.x && this._doors[i].y === origin.y) {
                            removeDoor = i;
                        }
                    }
                    this._doors.splice(removeDoor, 1);
                    this._floors.push({x: origin.x, y: origin.y});
                    this.game.player.keys -= 1;
            } else {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 8, 8, 48, 48, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        } else if (this.mapElementAt({x: origin.x, y: origin.y}) === "~") {
            if (this.game.player.specialKeys
                && checkCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 48, 48, 8, 8, null, Infinity))) {
                this._map[origin.x][origin.y] = "-";
                var removeDoor = -1;
                for (var i = 0; i < this._doors.length; i++) {
                    if (this._doors[i].d === "~" && this._doors[i].x === origin.x && this._doors[i].y === origin.y) {
                        removeDoor = i;
                    }
                }
                this._doors.splice(removeDoor, 1);
                this._floors.push({x: origin.x, y: origin.y});
                this.game.player.specialKeys -= 1;
            } else {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 48, 48, 8, 8, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        } else if (this.mapElementAt({x: origin.x, y: origin.y}) === "^") {
            if (this.game.player.specialKeys
                && checkCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 8, 8, 48, 48, null, Infinity))) {
                this._map[origin.x][origin.y] = "-";
                var removeDoor = -1;
                for (var i = 0; i < this._doors.length; i++) {
                    if (this._doors[i].d === "^" && this._doors[i].x === origin.x && this._doors[i].y === origin.y) {
                        removeDoor = i;
                    }
                }
                this._doors.splice(removeDoor, 1);
                this._floors.push({x: origin.x, y: origin.y});
                this.game.player.specialKeys -= 1;
            } else {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 8, 8, 48, 48, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        }

        // Left
        if (origin.x > 0) {
            if (this.mapElementAt({x: origin.x - 1, y: origin.y}) === "#") {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x - 1), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 48, 48, 48, 48, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        }

        // Up
        if (origin.y > 0) {
            if (this.mapElementAt({x: origin.x, y: origin.y - 1}) === "#") {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y - 1)},
                    new Collider(0, 0, 48, 48, 48, 48, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        }

        // Right
        if (origin.x < this._width - 1) {
            if (this.mapElementAt({x: origin.x + 1, y: origin.y}) === "#") {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x + 1), y: indexToCoordinate(origin.y)},
                    new Collider(0, 0, 48, 48, 48, 48, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        }

        // Down
        if (origin.y < this._height - 1) {
            if (this.mapElementAt({x: origin.x, y: origin.y + 1}) === "#") {
                let c = pushCollision({x: updatedPos.x, y: updatedPos.y},
                    collider,
                    {x: indexToCoordinate(origin.x), y: indexToCoordinate(origin.y + 1)},
                    new Collider(0, 0, 48, 48, 48, 48, null, Infinity));
                updatedPos.x = c.pos1.x;
                updatedPos.y = c.pos1.y;
            }
        }

        return updatedPos;
    }

    quickCollision(X, Y)
    {
      let map = this.mapElementAt({x: X, y: Y});
      if(map !== "-")
      {
        return true;
      }

      return false;
    }
    
    quickProjectileCollision(X, Y)
    {
      let map = this.mapElementAt({x: X, y: Y});
      if(map === "#")
      {
        return true;
      }

      return false;
    }

    get spawn() {
        return this._spawn;
    }
}

/**
 * @param {number} index An index from the level array.
 * @returns {number} center coordinate of the tile referenced by index.
 */
function indexToCoordinate(index) {
	return index * 96 + 48;
}

function coordinateToIndex(coordinate) {
	return Math.floor(coordinate / 96);
}
