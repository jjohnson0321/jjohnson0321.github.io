class RoomSpawner
{
	constructor(game, x, y, spawners, room, lockCam, dropKey, dropPotion, zoom = -1)
	{
		this.game = game;
		this.x = indexToCoordinate(x);
		this.y = indexToCoordinate(y);
		this.spawners = spawners;
		this.room = room;
		this.dropKey = dropKey;
		this.dropPotion = dropPotion;
		this.finishedCount = 0;
		this.removeFromWorld = false;
		this.lastCam = false;
		this.lockCam = lockCam;
		this.camLocked = false;
		this.zoomAmt = zoom;
		
		this.game.addEntity(this, LAYERS.SPAWNERS);
	}
	
	draw()
	{
	}
	
	update()
	{
		if(this.game.player !== null && this.game.player !== undefined)
		{
			if(this.lockCam && this.lastCam !== this.camLocked)
			{
			  this.game.player.camLocked = this.camLocked;
			  this.lastCam = this.camLocked;
			  
			  if(this.camLocked && this.zoomAmt !== -1)
			  {
				  console.log("THIS SHOULDNT HAVE HAPPENED");
				  this.game._camera._desiredZoom = this.zoomAmt;
			  }
			  else if(!this.camLocked)
			  {
				  this.game._camera._desiredZoom = DEFAULT_ZOOM;
			  }
			}
			if(this.finishedCount === this.spawners.length)
			{
				if(this.dropKey)
				{
					//drop Key
          this.lockCam = true;
					new Key(this.game, this.x, this.y, true);
				}
				if (this.dropPotion) {
					new HealthPotion(this.game, this.x, this.y);
				}
				this.destroy();
        this.update = function () {};
			}
		}
	}
	
	destroy()
	{
    if(this.dropKey)
    {
        new TimerCallback(this.game, 2, false, function () { this.game._camera._desiredZoom = DEFAULT_ZOOM;		this.game.player.camLocked = false;
		this.removeFromWorld = true; });
    }
	  else
    {
      this.game._camera._desiredZoom = DEFAULT_ZOOM;
      this.game.player.camLocked = false;
      this.removeFromWorld = true;
    }

	}
}

/**
 * An object that will create enemies at a certain point in the game world
 * @author Joel Johnson, Gavin Montes
 */
class Spawner {
    /**
     * Creates the spawner object
     * @param game, a reference to the game engine (so we can add enemies to the game).
     * @param x, the x coordinate of the spawner
     * @param y, the y coordinate of the spawner
     * @param maxAtOnce, how many enemies should be allowed to spawn at once before spawning pauses
     * For example: If maxAtOnce = 5, the spawner will create 5 enemies before disabling. The spawn timer will be reset,
     * and will not start again until  the number of alive enemies that it has created becomes less than 5 (if you kill them).
     * @param frequency, how often the spawner creates enemies.
     * @param spawnList, a list of enemy types that this spawner can create.
     * @param random, true if we want to randomly spawn enemies from the spawnList, false if we want to generate enemies
     * in the order that they appear in the spawnList
     * @param radius, if the player is within the radius of the spawner it will be active, otherwise, the spawner will stop spawning
     * @param maxSpawn, How many total enemies the spawner can create before permanently self destructing. (Think battle room).
     * Set to 0 if no maximum
     */
    constructor(game, x, y, maxAtOnce, frequency, spawnList, random, radius, maxSpawn, owner, delay) {
        this.game = game;
        this.x = indexToCoordinate(x);
        this.y = indexToCoordinate(y);
        this.maxAtOnce = maxAtOnce;
        this.frequency = frequency;
        this.spawnList = spawnList;
        this.random = random;
        this.radius = radius;
        this.maxSpawn = maxSpawn;
        this.numOut = 0;
        this.totalSpawned = 0;
        this.choice = 0;
        this.hasSpawned = false;
        this.owner = owner;
        this.removeFromWorld = false;

        var that = this;

        this.spawn_timer = new TimerCallback(game, frequency, true,
            function () {
                if (that.shouldSpawn()) {
                    that.spawn();
                }
            }
        );
        this.spawn_timer.pause();
        this.delayTimer = new TimerCallback(game, delay, false, function() {that.spawn_timer.unpause();});
        this.delayTimer.pause();
        

        this.game.addEntity(this, LAYERS.SPAWNERS);
    }

    // Make sure the player is in the radius of the spawner, if not reset and pause the spawn timer.
    update() {
        if (this.game.player !== undefined && this.game.player !== null) {
            //If player is in radius
          if(this.owner === null)
          {
            if (circleToCircle(this.game.player, this)) {
              // Spawn immediately the first time
              this.trySpawn();
            } else {
              this.spawn_timer.pause();
            }
          }
          else
          {
            let x = coordinateToIndex(this.game.player.x);
            let y = coordinateToIndex(this.game.player.y);
            if(x <= this.owner.room.bottomRight.x && x >= this.owner.room.upperLeft.x && y <= this.owner.room.bottomRight.y && y >= this.owner.room.upperLeft.y)
            {
              if(this.delayTimer.removeFromWorld !== true)
              {
                this.delayTimer.unpause();
              }
              else
              {
                this.trySpawn();
              }
              if(this.owner.lockCam === true)
              {
                this.game._camera._desiredLoc.x = this.owner.x;
                this.game._camera._desiredLoc.y = this.owner.y;
                this.owner.camLocked = true;
              }
            }
            else
            {
              if(this.delayTimer.removeFromWorld !== true)
              {
                this.delayTimer.reset();
              }
              else
              {
                this.spawn_timer.pause();
              }
              this.owner.camLocked = false;
            }
            if(!this.shouldSpawn() && this.numOut === 0){
              this.owner.finishedCount++;
              this.destroy();
              return false;
            }
          }
        }
    }
	
	trySpawn()
	{
		if (!this.hasSpawned) {
			this.spawn();
			this.hasSpawned = true;
		} else {
			this.spawn_timer.unpause();
		}
	}

    draw() {
    }

    shouldSpawn() {
        // If we haven't already spawned the max TOTAL
        if (this.maxSpawn === 0 || this.totalSpawned < this.maxSpawn) {
            // If there are not already the max number of enemies spawned at once.
            if (this.maxAtOnce === 0 || this.numOut < this.maxAtOnce) {
                return true;
            }
        }
        return false;
    }

    spawn() {
        if (this.random) {
            this.choice = Math.ceil(Math.random() * this.spawnList.length) - 1;
        } else {
            if (this.choice >= this.spawnList.length) {
                this.choice = 0;
            }
        }
        let spawn = new this.spawnList[this.choice].constructor(this.game, this.x, this.y, this);
        this.totalSpawned++;
        this.numOut++;
        this.choice++;
        if (this.numOut >= this.maxAtOnce && this.maxAtOnce !== 0) {
            this.spawn_timer.reset();
            this.spawn_timer.pause();
        }
    }

    destroy() {
        this.spawn_timer.destroy();
		this.removeFromWorld = true;
    }
}


class PlayerSpawner {
    constructor(game, maxAtOnce, spawnList, probs) {
        this.x = 0;
        this.y = 0;
        this._game = game;
        game.addEntity(this, LAYERS.FLOOR);
        this._maxAtOnce = maxAtOnce;
        this._spawnList = spawnList;
        this._probs = probs;
        this._start = false;
        this._currentEnemies = [];
    }

    draw(ctx) {}

    destroy() {
        this.removeFromWorld = true;
    };

    update() {
        if (this._game.game_state === GAME_STATES.PLAYING && this._currentEnemies.length < this._maxAtOnce && (this._start === true || this._game.player.x > 300)) {
            this._start = true;
            let TL = {x: coordinateToIndex(this._game._camera.clickPosTranslation({x: 0 - (96 * STANDARD_DRAW_SCALE), y: 0}).x),
                y: coordinateToIndex(this._game._camera.clickPosTranslation({x: 0, y: 0 - (96 * STANDARD_DRAW_SCALE)}).y)};
            let BR = {x: coordinateToIndex(this._game._camera.clickPosTranslation({x: this._game.ctx.canvas.width + (96 * STANDARD_DRAW_SCALE), y: 0}).x),
                y: coordinateToIndex(this._game._camera.clickPosTranslation({x: 0, y: this._game.ctx.canvas.height + (96 * STANDARD_DRAW_SCALE)}).y)};

            let spawnStuff = (x, y) => {
                let i = Math.floor(Math.random() * this._probs.length);
                if (Math.random() * 100 <= this._probs[i]) {
                    this._currentEnemies.push(new this._spawnList[i].constructor(this._game, x, y, null));
                }
            };

            let x1 = Math.floor(Math.random() * (BR.x - TL.x + 1)) + TL.x;
            let x2 = Math.floor(Math.random() * (BR.x - TL.x + 1)) + TL.x;
            let y1 = Math.floor(Math.random() * (BR.y - TL.y + 1)) + TL.y;
            let y2 = Math.floor(Math.random() * (BR.y - TL.y + 1)) + TL.y;
            if (x1 >= 0 && x1 < this._game._sceneManager.level._width 
            && TL.y >= 0 && TL.y < this._game._sceneManager.level._height
            && this._game._sceneManager.level._map[x1][TL.y] === "-") spawnStuff(indexToCoordinate(x1), indexToCoordinate(TL.y));
            if (x2 >= 0 && x2 < this._game._sceneManager.level._width
            && BR.y >= 0 && BR.y < this._game._sceneManager.level._height
            && this._game._sceneManager.level._map[x2][BR.y] === "-") spawnStuff(indexToCoordinate(x2), indexToCoordinate(BR.y));
            if (y1 >= 0 && y1 < this._game._sceneManager.level._height
            && TL.x >= 0 && TL.x < this._game._sceneManager.level._width
            && this._game._sceneManager.level._map[TL.x][y1] === "-") spawnStuff(indexToCoordinate(TL.x), indexToCoordinate(y1));
            if (y2 >= 0 && y2 < this._game._sceneManager.level._height
            && BR.x >= 0 && BR.x < this._game._sceneManager.level._width
            && this._game._sceneManager.level._map[BR.x][y2] === "-") spawnStuff(indexToCoordinate(BR.x), indexToCoordinate(y2));
        }

        if (this._game.game_state === GAME_STATES.PLAYING && this._currentEnemies.length >= this._maxAtOnce) {
            let clear = true;
            let p = {x: this._game.player.x, y: this._game.player.y};
            this._currentEnemies.forEach((e) => {
                if (Math.sqrt((p.x - e.x) * (p.x - e.x) + (p.y - e.y) * (p.y - e.y)) < 500) {
                    clear = false;
                }
            });
            if (clear) {
                this._currentEnemies.forEach((e) => {
                    e.destroy();
                });
                this._currentEnemies = [];
            }
        }
    }
}