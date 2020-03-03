class Enemy extends Entity {
    constructor(game, x, y, spawner) {
        super(game, x, y);
        this.spawner = spawner;
        this.game.addEntity(this, LAYERS.ENEMIES);
        this.goalPoint = null;

        let that = this;
        /*this.damageTimer = new TimerCallback(this.game, 1, true, function() { that.hurt = false;
        this.pause();});*/
        this.hurt = false;
		this.invincible = false;
        this.hp = 1;
		
		this.weight = 1;
    }

    destroy() {
        this.game.player.progressBar.progress += this.game.player.characterClass.stats.specialChargeFromKill;
        if (this.spawner !== null) {
            this.spawner.spawn_timer.unpause();
            this.spawner.numOut--;
            this.spawner.spawn_timer.unpause();
        }
        new Remnant(this.game, this.x, this.y, this.deathAnimation);
        
        let random = Math.random()*100;
        if(random <= 0.5)
        {
          new StarPotion(this.game, this.x, this.y);
        }
        else if(random <= 1)
        {
          new HealthPotion(this.game, this.x, this.y);
        }
        else if(random <= 2)
        {
          new SpeedPotion(this.game, this.x, this.y);
        }
        
        super.destroy();
    }

    pathfind(range, depth) {
        let myIndex = {x: coordinateToIndex(this.x), y: coordinateToIndex(this.y)};
        let playerIndex = {x: coordinateToIndex(this.game.player.x), y: coordinateToIndex(this.game.player.y)};

        let vecToPlayer = dirV({x: this.x, y: this.y}, {x: this.game.player.x, y: this.game.player.y});
        let normVecToPlayer = normalizeV(vecToPlayer);

        if (lengthV(vecToPlayer) < range) {

            //If we're in the same tile as the player or 1 tile away
            if (playerIndex.x === myIndex.x && playerIndex.y === myIndex.y) {
                // Go straight toward the player
                this.goalPoint = {x: this.game.player.x, y: this.game.player.y};
                return;
            }

            //In center of tile, enqueue all adj tiles
            let queue = [];
            let visited = [{x: myIndex.x, y: myIndex.y}];

            let directions = this.getDirections(myIndex, visited);
            for (let i = 0; i < directions.length; i++) {
                let dir = directions[i];
                let newNode = {x: myIndex.x + dir.x, y: myIndex.y + dir.y};
                // newNode.orig = newNode;
                newNode.moves = [dir.cardinal];
                newNode.tiles = [{x: newNode.x, y: newNode.y}];
                queue.push(newNode);
            }

            for (let i = 0; i < depth; i++) {
                let node = queue.shift();
                if (node) {
                    if (playerIndex.x === node.x && playerIndex.y === node.y) {
                        for (let j = 1; j < node.moves.length; j++) {
                            if (node.moves[j] !== node.moves[0]) {
                                this.goalPoint = {
                                    x: indexToCoordinate(node.tiles[j - 1].x),
                                    y: indexToCoordinate(node.tiles[j - 1].y)
                                };
                                return;
                            }
                        }
                        this.goalPoint = {
                            x: this.game.player.x,
                            y: this.game.player.y
                        };
                        // console.log("PLAYER: " + indexToCoordinate(playerIndex.x) + ", " + indexToCoordinate(playerIndex.y));
                        // console.log("ME: " + this.goalPoint.x + ", " + this.goalPoint.y);

                        return;
                    } else {
                        directions = this.getDirections(node, visited);
                        for (let j = 0; j < directions.length; j++) {
                            let newNode = {x: node.x + directions[j].x, y: node.y + directions[j].y};
                            // newNode.orig = node.orig;
                            newNode.moves = [...node.moves];
                            newNode.moves.push(directions[j].cardinal);
                            newNode.tiles = [...node.tiles];
                            newNode.tiles.push({x: newNode.x, y: newNode.y});
                            queue.push(newNode);
                            visited.push(newNode);
                        }
                    }
                } else {
                    // Empty queue
                    break;
                }
            }
        }
    }

    getDirections(node, visited) {
        let directions = [];
        let x = node.x;
        let y = node.y;

        let left = {x: x - 1, y: y};
        let right = {x: x + 1, y: y};
        let up = {x: x, y: y - 1};
        let down = {x: x, y: y + 1};

        if (this.game.sceneManager.level.mapElementAt(left) === "-" && !this.isVisited(left, visited)) {
            directions.push({x: -1, y: 0, cardinal: DIRECTION_LEFT});
        }
        if (this.game.sceneManager.level.mapElementAt(right) === "-" && !this.isVisited(right, visited)) {
            directions.push({x: 1, y: 0, cardinal: DIRECTION_RIGHT});
        }
        if (this.game.sceneManager.level.mapElementAt(up) === "-" && !this.isVisited(up, visited)) {
            directions.push({x: 0, y: -1, cardinal: DIRECTION_UP});
        }
        if (this.game.sceneManager.level.mapElementAt(down) === "-" && !this.isVisited(down, visited)) {
            directions.push({x: 0, y: 1, cardinal: DIRECTION_DOWN});
        }

        return directions;
    }

    isVisited(node, visited) {
        for (let i = 0; i < visited.length; i++) {
            if (visited[i].x === node.x && visited[i].y === node.y) {
                return true;
            }
        }
        return false;
    }

    go(dir) {
        this.x += dir.x * this.game._clockTick * this.speed;
        this.y += dir.y * this.game._clockTick * this.speed;
    }
    
    takeDamage(dmg, dir, knockBack)
    {
      if(!this.hurt)
      {
        if(!this.invincible)
        {
          let checkWalls = true;
          if(this.wallCollision({x: this.x, y: this.y}))
          {
            checkWalls = false;
          }
          
          this.x += dir.x * knockBack * 1/this.weight;
          this.y += dir.y * knockBack * 1/this.weight;
          
          if(checkWalls)
          {
            while(this.wallCollision({x: this.x, y: this.y}))
            {
              this.x -= dir.x * 0.5;
              this.y -= dir.y * 0.5;
            }
          }
          this.hp -= dmg;
          this.hurt = true;
          if (this.hp <= 0) {
            this.destroy();
          }
          else
          {
            let that = this;
            new TimerCallback(this.game, 0.01, false, function() {that.hurt = false; });
          }
        }
      }
    }
}