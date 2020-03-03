class Endless {
	constructor() {
		this.width = Math.floor(Math.random() * 25) + 20;
        this.height = Math.floor(Math.random() * 25) + 20;
        let randomness = Math.floor(Math.random() * 100);
        if (randomness < 50) this.floorType = 0;
        if (randomness >= 50 && randomness < 75) this.floorType = 3;
        if (randomness >= 75 && randomness < 87) this.floorType = 1;
        if (randomness >= 87 && randomness < 100) this.floorType = 2;
		if (this.floorType <= 0) {
            this.wallType = 0;
        } else {
            this.wallType = 1;
        }
		this.nextLevel = Endless.prototype;
		this.musicId = 'hedgeMazeMusic';

		this.layout = this.buildLevel();

		this.roomSpawnerList = [];
		this.spawnerList = [];
		this.turretList = [];
		this.spawnerProjectileList = [];
		this.pickupList = [];
        this.unlockableCharacter = [];
        this.playerSpawner = {
            maxAtOnce: 15,
            spawnList:
            [Bat.prototype, CactusBoi.prototype, HedgeMonster.prototype,
            PuddleJumper.prototype, Skeleton.prototype, Snek.prototype,
            StoneGolem.prototype, Turtle.prototype, Snak.prototype],
            probs: [50, // Bat
                10, // Cactus
                (this.floorType === 0) ? 1 : 0, // Hedge Monster
                40, // Puddle Jumper
                35, // Skeleton
                20, // Snek
                15, // Stone Golem
                5, // Turtle
                5 // Snak
            ]
        };
    }
    
/* pls dont delete
    buildLevel() {
        let map = [];
    
        // Build Map
        for (let i = 0; i < this.width; i++) {
            map[i] = [];
        }
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                map[x][y] = {tile: "#", massID: null, massSize: 0};
                if (x < 2 || x >= this.width - 2 || y < 2 || y >= this.height - 2) {
                    // Outer walls.
                    map[x][y].massID = undefined;
                } else {
                    // Generate random walls inside.
                    if (Math.floor(Math.random() * 2) === 0) map[x][y].tile = "-";
                }
            }
        }
    
        // Spawn and Exit
        let spawn = {x: 0, y: 2 + Math.floor(Math.random() * (this.height - 4))};
        let exit = {x: this.width - 1, y: 2 + Math.floor(Math.random() * (this.height - 4))};
        map[spawn.x][spawn.y].tile = "S";
        map[spawn.x][spawn.y].massID = -1;
        map[spawn.x][spawn.y].massSize = 3;
        map[spawn.x + 1][spawn.y].tile = "-";
        map[spawn.x + 1][spawn.y].massID = -1;
        map[spawn.x + 1][spawn.y].massSize = 3;
        map[spawn.x + 2][spawn.y].tile = "-";
        map[spawn.x + 2][spawn.y].massID = -1;
        map[spawn.x + 2][spawn.y].massSize = 3;
        map[exit.x][exit.y].tile = "E";
        map[exit.x][exit.y].massID = -2;
        map[exit.x][exit.y].massSize = 3;
        map[exit.x - 1][exit.y].tile = "-";
        map[exit.x - 1][exit.y].massID = -2;
        map[exit.x - 1][exit.y].massSize = 3;
        map[exit.x - 2][exit.y].tile = "-";
        map[exit.x - 2][exit.y].massID = -2;
        map[exit.x - 2][exit.y].massSize = 3;

        let massCount = 0;
        for (let y = 2; y < this.height - 2; y++) {
            for (let x = 2; x < this.width - 2; x++) {
                if (map[x][y].tile === "-" && map[x][y].massID === null) {

                    let ids = [];
                    let neighbors = [];
                    if (typeof map[x + 1][y].massID === Number && map[x + 1][y].tile === "-") ids.push({id: map[x + 1][y].massID, size: map[x + 1][y].massSize});
                    if (map[x + 1][y].tile === "-") neighbors.push({x: x + 1, y: y});
                    if (typeof map[x - 1][y].massID === Number && map[x - 1][y].tile === "-") ids.push({id: map[x - 1][y].massID, size: map[x - 1][y].massSize});
                    if (map[x - 1][y].tile === "-") neighbors.push({x: x - 1, y: y});
                    if (typeof map[x][y + 1].massID === Number && map[x][y + 1].tile === "-") ids.push({id: map[x][y + 1].massID, size: map[x][y + 1].massSize});
                    if (map[x][y + 1].tile === "-") neighbors.push({x: x, y: y + 1});
                    if (typeof map[x][y - 1].massID === Number && map[x][y - 1].tile === "-") ids.push({id: map[x][y - 1].massID, size: map[x][y - 1].massSize});
                    if (map[x][y - 1].tile === "-") neighbors.push({x: x, y: y - 1});
                    if (ids.length === 0) { // No neighbor masses.
                        if (neighbors.length > 0) { // Not just a dot.
                            map[x][y].massID = massCount;
                            map[x][y].massCount = neighbors.length + 1;
                            neighbors.forEach((n) => {
                                map[n.x][n.y].massID = massCount;
                                map[n.x][n.y].massCount = neighbors.length + 1;
                            });
                            massCount++;
                        } else { // Eliminate dots.
                            map[x][y].tile = "#";
                        }
                    } else { // Neighbor mass.

                        // Get smallest mass ID.
                        let newID = 0;
                        let min = ids[0].id;
                        let idN = 1;
                        for (let cnt = 1; cnt < ids.length; cnt++) {
                            if (ids[cnt].id < min) {
                                min = ids[cnt].id;
                                newID = cnt;
                            } else if (ids[cnt].id === min) {
                                idN++;
                            }
                        }

                        // Add all to mass.
                        map[x][y].massID = min;
                        map[x][y].massSize = newID.massSize - idN;
                        neighbors.forEach((n) => {
                            map[n.x][n.y].massID = min;
                            map[n.x][n.y].massCount = newID.massSize - idN;
                        });
                    }
                }
            }
        }

    
    
        // Convert to String
        let result = "";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                result += map[x][y].tile;
            }
        }
    
        return result;
    }
    */
     //First Attempt
    buildLevel() {
        let map = [];
    
        // Build Map
        for (let i = 0; i < this.width; i++) {
            map[i] = [];
        }
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                map[x][y] = {tile: "#", visited: false};
                if (x < 2 || x >= this.width - 2 || y < 2 || y >= this.height - 2) {
                    map[x][y].visited = true;
                }
            }
        }
    
        // Spawn and Exit
        let spawn = {x: 0, y: 2 + Math.floor(Math.random() * (this.height - 4))};
        let exit = {x: this.width - 1, y: 2 + Math.floor(Math.random() * (this.height - 4))};
        map[spawn.x][spawn.y].tile = "S";
        map[spawn.x + 1][spawn.y].tile = "-";
        map[spawn.x + 2][spawn.y].tile = "-";
        map[exit.x][exit.y].tile = "E";
        map[exit.x - 1][exit.y].tile = "-";
        map[exit.x - 2][exit.y].tile = "-";
        spawn.x += 2;
        exit.x -= 2;
    
        // Build Path
        let find = (cur, path) => {
            if (cur.x === exit.x && cur.y === exit.y) {
                return path;
            }
            let choices = [];
            if (cur.x + 1 < this.width - 2 && !map[cur.x + 1][cur.y].visited) {
                choices.push({x: cur.x + 1, y: cur.y});
                choices.push({x: cur.x + 1, y: cur.y});
            }
            if (cur.x - 1 >= 2 && !map[cur.x - 1][cur.y].visited) {
                choices.push({x: cur.x - 1, y: cur.y});
                choices.push({x: cur.x - 1, y: cur.y});
                choices.push({x: cur.x - 1, y: cur.y});
            }
            if (cur.y + 1 < this.height - 2 && !map[cur.x][cur.y + 1].visited) {
                choices.push({x: cur.x, y: cur.y + 1});
                choices.push({x: cur.x, y: cur.y + 1});
                choices.push({x: cur.x, y: cur.y + 1});
                choices.push({x: cur.x, y: cur.y + 1});
            }
            if (cur.y - 1 >= 2 && !map[cur.x][cur.y - 1].visited) {
                choices.push({x: cur.x, y: cur.y - 1});
                choices.push({x: cur.x, y: cur.y - 1});
                choices.push({x: cur.x, y: cur.y - 1});
                choices.push({x: cur.x, y: cur.y - 1});
            }
            if (choices.length === 0) {
                path.forEach((pos) => {
                    map[pos.x][pos.y].visited = false;
                });
                return null;
            }
    
            let choice = Math.floor(Math.random() * choices.length);
            path.push(choices[choice]);
            map[choices[choice].x][choices[choice].y].visited = true;
            return find(choices[choice], path);
            
        };
    
        let path;
        do {
            path = find(spawn, []);
        } while (path === null);
    
    
        let rad = (pos, radius) => {
            map[pos.x][pos.y].tile = "-";
            if (radius >= 2) {
                if (pos.x + 1 < this.width - 2) map[pos.x + 1][pos.y].tile = "-";
                if (pos.x - 1 >= 2) map[pos.x - 1][pos.y].tile = "-";
                if (pos.y + 1 < this.height - 2) map[pos.x][pos.y + 1].tile = "-";
                if (pos.y - 1 >= 2) map[pos.x][pos.y - 1].tile = "-";
            }
        };
        path.forEach((pos) => {
            rad(pos, Math.ceil(Math.random() * 2));
        });
    
    
        // Convert to String
        let result = "";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                result += map[x][y].tile;
            }
        }
    
        return result;
    }
    
}