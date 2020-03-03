/**
 * @author Joel Johnson, Gavin Montes, Gordon McCreary
 * Fires a projectile from an origin point along a vector.
 * @param game a reference to the game engine.
 * @param x the origin point's x value
 * @param y the origin point's y value
 * @param dir a VECTOR direction (not a UP,DOWN, LEFT, RIGHT direction)
 * @param speed, the speed the projectile will travel
 * @param lifetime, how long in ms before the projectile is destroyed.
 * @param owner, a reference to the player or enemy that fired the projectile.
 * @param animation, the projectile's animation.
 * @param dmg, the amount of damage the projectile does on hit.
 * @param radius, the radius of the projectile (used in collision)
 * @constructor
 */
class Projectile extends Entity {
    constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, deathAnimation = null) {
        super(game, x, y);

        this.startX = x;
        this.startY = y;

        this.dx = 0;
        this.dy = 0;

        this.dir = dir;
        this.speed = speed;

        this.collider = new Collider(0, 0, -7, 7, -7, 8, null, 150);
        this.lifetime = lifetime;
        this.dieOnHit = dieOnHit;
        
        var that = this;
        this.timer = new TimerCallback(that.game, that.lifetime, false, function () {
            that.destroy();
        });
        this.ctx = game.ctx;
        this.owner = owner;
        this.attached = null;

        this.animation = animation;
        this.animation.resetAnimation();
        
        this.deathAnimation = deathAnimation;

        this.dmg = dmg;
        this.radius = radius;
        this.knockBack = knockback;
        
        this.giveBackAmmo = false;

        if (this.owner === this.game.player) {
            this.game.addEntity(this, LAYERS.PLAYER_PROJECTILES);
        } else {
            this.game.addEntity(this, LAYERS.ENEMY_PROJECTILES);
        }
	
        this.myAddScale = 1;
        if(this.animation._addScale !== -1)
        {
          this.myAddScale = this.animation._addScale;
        }
        this.myScale = [STANDARD_DRAW_SCALE * this.myAddScale];
        
        this.animation._scale = this.myScale;
    }

    update() {
        this.myScale[0] = this.myAddScale * STANDARD_DRAW_SCALE;
        if(this.attached === null)
        {
          this.testCollision();
        }

        this.dx += this.dir.x * this.game._clockTick * this.speed;
        this.dy += this.dir.y * this.game._clockTick * this.speed;

        if (this.attached !== null) {
            let direction = this.dir;
            if(this.owner === this.game.player)
            {
              direction = dirToVector(vectorToDir(this.dir));
            }
            this.x = this.attached.x + direction.x * this.speed;
            this.y = this.attached.y + direction.y * this.speed;
        } else {
            this.x = this.startX + this.dx;
            this.y = this.startY + this.dy;
        }

        let newPos = {x: this.x, y: this.y};
        if (this.wallCollision(newPos)) {
            this.destroy();
        } else {
            this.oldPos = newPos;
        }
    }

    testCollision() {
      if(this.game.player !== null)
      {
        var that = this;

        if (this.animation.isDone()) {
            this.animation.pause();
            this.animation.setFrame(this.animation.getLastFrameAsInt());
        }

        if (this.owner instanceof Player) {
            //For each enemy
            this.game.entities[LAYERS.ENEMIES].forEach(function (elem) {
                if (that.removeFromWorld !== true && elem.removeFromWorld !== true) {
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        that.done = true;
                        elem.takeDamage(that.dmg, that.dir, that.knockBack);
                    }
                }
            });
            this.game.entities[LAYERS.OBJECTS].forEach(function (elem) {
                if (that.removeFromWorld !== true && elem.removeFromWorld !== true) {
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        that.done = true;
                        elem.takeDamage(that.dmg, that.dir, that.knockBack);
                    }
                }
            });
        } else {
            if (circleToCircle(that, that.game.player)) {
                let attackedFromVector = normalizeV(dirV({x: this.x, y: this.y}, {
                    x: this.game.player.x,
                    y: this.game.player.y
                }));
                let attackedFromDir = vectorToDir(attackedFromVector);
                this.game.player.takeDmg(1, attackedFromDir);
            }
            this.game.entities[LAYERS.OBJECTS].forEach(function (elem) {
                if (that.removeFromWorld !== true && elem.removeFromWorld !== true) {
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        that.done = true;
                        elem.takeDamage(that.dmg, that.dir, that.knockBack);
                    }
                }
            });
        }
      }
    }

    draw() {
        let screenPos = this.game._camera.drawPosTranslation({x: this.x, y: this.y}, 1);

        this.animation.drawFrame(this.game._clockTick, this.game._ctx, screenPos.x, screenPos.y, true);
    }

    attachTo(attached) {
        this.attached = attached;
    }
    
    hitOnce()
    {
      let that = this;
      new TimerCallback(this.game, this.lifetime/4, false, function () { that.testCollision(); });
    }
    
    destroy()
    {
      if(this.deathAnimation)
      {
        this.animation = this.deathAnimation;
        let that = this;
        
        this.update = function() {};
        if(that.giveBackAmmo)
        {
          that.owner.attackCounter--;
          that.giveBackAmmo = false;
        }
        
        new TimerCallback(this.game, 0, false, function() {
          if(that.animation.isDone())
          {
            if(!that.removeFromWorld)
            {
              that.removeFromWorld = true;
            }
          }
        });
      }
      else
      {
        if(!this.removeFromWorld)
        {
          this.removeFromWorld = true;
          if(this.giveBackAmmo)
          {
            this.owner.attackCounter--;
          }
        }
      }
    }
    
    GiveBackAmmo()
    {
      this.giveBackAmmo = true;
    }
    
    wallCollision(newPos)
    {
      let dir = dirV(this.oldPos, newPos);
      let xOffset = 0;
      let yOffset = 0;

      let returnValue = this.game._sceneManager.level.quickProjectileCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
      //console.log(returnValue);
      if(returnValue === true)
      {
        return returnValue;
      }

      yOffset = this.collider._upHit;
      returnValue = this.game._sceneManager.level.quickProjectileCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
      if(returnValue === true)
      {
        return returnValue;
      }

      yOffset = this.collider._downHit;
      returnValue = this.game._sceneManager.level.quickProjectileCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
      if(returnValue === true)
      {
        return returnValue;
      }

      xOffset = this.collider._leftHit;
      returnValue = this.game._sceneManager.level.quickProjectileCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
      if(returnValue === true)
      {
        return returnValue;
      }

      xOffset = this.collider._rightHit;
      returnValue = this.game._sceneManager.level.quickProjectileCollision(coordinateToIndex(newPos.x + xOffset), coordinateToIndex(newPos.y + yOffset));
      if(returnValue === true)
      {
        return returnValue;
      }
      
      return false;
    }

}

class HomingProjectile extends Projectile {
	constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback)
	{
		super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback);
	}
	update()
	{
		let direction = dirV({x: this.x, y: this.y}, {x: this.game.player.x, y: this.game.player.y});
		direction = normalizeV(direction);
		this.x += direction.x * this.speed;
		this.y += direction.y * this.speed;
    
    this.testCollision();
	}
  
}

class EasingProjectile extends Projectile {
    constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing) {
      super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback);

      this.move = move;
      this.easing = easing;

      this.move();
    }

    update() {
      //console.log(this.myAddScale);
      this.myScale[0] = this.myAddScale * STANDARD_DRAW_SCALE;
      this.testCollision();
      this.move();
    }

    line() {
        let t = this.easing(this.timer.getPercent());
        this.x = this.startX + t * this.dir.x * this.speed;
        this.y = this.startY + t * this.dir.y * this.speed;
    }

    circle() {
        let t = this.easing(this.timer.getPercent());
        let circle = Math.atan2(this.dir.y, this.dir.x);
        this.x = this.startX + Math.cos(circle + t * 2 * Math.PI) * this.speed;
        this.y = this.startY + Math.sin(circle + t * 2 * Math.PI) * this.speed;
    }

    spiral() {
        let t = this.easing(this.timer.getPercent());
        let circle = Math.atan2(this.dir.y, this.dir.x);
        this.x = this.startX + Math.cos(circle + t * 2 * Math.PI) * this.speed * t;
        this.y = this.startY + Math.sin(circle + t * 2 * Math.PI) * this.speed * t;
    }

}

class SpawnerProjectile extends EasingProjectile {
  constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing, timeToSpawn, attach, shots, circleTime, loop, spawnDir)
  {
    super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing);
    this.startX = indexToCoordinate(x);
    this.startY = indexToCoordinate(y);
    this.timeToSpawn = timeToSpawn;
    this.attach = attach;
    this.shots = shots;
    this.circleTime = 0;
    let that = this;
    this.spawnTimer = new TimerCallback(this.game, timeToSpawn, true, function () { if(that.removeFromWorld !== true)that.spawn(); });
    this.circleTimer = null;
    this.spawnDir = spawnDir;
    this.radius = -100;
    if(circleTime !== 0)
    {
      this.circleTimer = new Timer(this.game, circleTime, true);
    }
    this.loop = true;
    if(this.loop)
    {
      this.timer.destroy();
      this.timer = new Timer(that.game, that.lifetime, true);
    }
  }
  
  /*
  update()
  {
    this.dx += this.dir.x * this.game._clockTick * this.speed;
    this.dy += this.dir.y * this.game._clockTick * this.speed;

	this.x = this.startX + this.dx;
	this.y = this.startY + this.dy;

    let newPos = {x: this.x, y: this.y};
    if (this.wallCollision(newPos)) {
        this.destroy();
    } else {
        this.oldPos = newPos;
    }
  }*/
  
  spawn()
  {
    let t = 0;
    if(this.circleTimer !== null)
    {
    t = this.easing(this.circleTimer.getPercent());
    }
    let circle = 0;
    if(this.spawnDir.right)
    {
     for(let i = 0; i < this.shots; i++)
     {
      let a = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/Fireball.png"),
        16, 16,
        {x: 0, y: 0}, {x: 3, y: 0},
        6, true, STANDARD_DRAW_SCALE);
      let p = new Projectile(this.game, this.x, this.y, {x: Math.cos(circle + t * 2 * Math.PI), y: Math.sin(circle + t * 2 * Math.PI)}, i * 9.6, 1/50, true, this, a, 1, 1, 0);
      if(this.attach) p.attachTo(this);
     }
    }
    if(this.spawnDir.down)
    {
     for(let i = 0; i < this.shots; i++)
     {
      let a = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/Fireball.png"),
        16, 16,
        {x: 0, y: 0}, {x: 3, y: 0},
        6, true, STANDARD_DRAW_SCALE);
      let p = new Projectile(this.game, this.x, this.y, {x: Math.cos(circle + (t + 0.25) * 2 * Math.PI), y: Math.sin(circle + (t + 0.25) * 2 * Math.PI)}, i * 9.6, 1/50, true, this, a, 1, 1, 0);
      if(this.attach)p.attachTo(this);
     }
    }
    if(this.spawnDir.left)
    {
     for(let i = 0; i < this.shots; i++)
     {
      let a = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/Fireball.png"),
        16, 16,
        {x: 0, y: 0}, {x: 3, y: 0},
        6, true, STANDARD_DRAW_SCALE);
      let p = new Projectile(this.game, this.x, this.y, {x: Math.cos(circle + (t + 0.5) * 2 * Math.PI), y: Math.sin(circle + (t + 0.5) * 2 * Math.PI)}, i * 9.6, 1/50, true, this, a, 1, 1, 0);
      if(this.attach)p.attachTo(this);
     }
    }
    if(this.spawnDir.up)
    {
     for(let i = 0; i < this.shots; i++)
     {
      let a = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/Fireball.png"),
        16, 16,
        {x: 0, y: 0}, {x: 3, y: 0},
        6, true, STANDARD_DRAW_SCALE);
      let p = new Projectile(this.game, this.x, this.y, {x: Math.cos(circle + (t + 0.75) * 2 * Math.PI), y: Math.sin(circle + (t + 0.75) * 2 * Math.PI)}, i * 9.6, 1/50, true, this, a, 1, 1, 0);
      if(this.attach)p.attachTo(this);
     }
    }
  }
  
	destroy() {
		this.removeFromWorld = true;
	}
}

class Flame extends EasingProjectile
{
	constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing)
	{
    super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing);
    this.myScale[0] = 0;
    this.animation._scale = this.myScale;
  }
  
  update() {
      if(this.timer.getPercent() < 0.1)
      {
        this.testCollision();
      }
      this.move();
      this.myScale[0] = this.easing(this.timer.getPercent()) * 3 * STANDARD_DRAW_SCALE;
	  
	  let newPos = {x: this.x, y: this.y};
	  if (this.wallCollision(newPos)) {
      console.log("destroy special projectile");
			this.destroy();
		} else {
			this.oldPos = newPos;
		}
  }
}

class FlameWall extends EasingProjectile
{
	constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing, timeToSpawn, length)
	{
		super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing);
		this.timeToSpawn = timeToSpawn;
		this.count = 1;
		this.length = length;
		let that = this;
		this.myScale[0] = 0;
		this.animation._scale = this.myScale;
		this.spawnTimer = new TimerCallback(this.game, timeToSpawn, true,
      function()
      {
        if(that.count < that.length)
        {
          that.count++;
            let perp = perpendicularV(that.dir);
            let offsetX = (that.dir.x * (that.count-1) - perp.x * (that.count-1)/2) * that.speed;
            let offsetY = (that.dir.y * (that.count-1) - perp.y * (that.count-1)/2) * that.speed;
          for(let i = 0; i < that.count; i++)
          {
            let animation = that.owner.characterClass.animation.specialProjectile();
            new Flame(that.game, that.x + offsetX, that.y + offsetY, that.dir, that.speed, that.lifetime, that.dieOnHit, that.owner, animation, that.dmg, that.radius, that.knockBack, that.move, that.easing);
            offsetX += perp.x * that.speed;
            offsetY += perp.y * that.speed;
          }
        }
        else
        {
          this.destroy();
        }
      });
	}
  update()
  {
    this.myScale[0] = this.easing(this.timer.getPercent()) * 3 * STANDARD_DRAW_SCALE;
	
    let newPos = {x: this.x, y: this.y};
    if (this.wallCollision(newPos)) {
      this.destroy();
    } else {
      this.oldPos = newPos;
    }
  }
  
  destroy()
  {
    this.removeFromWorld = true;
    this.owner.progressBar.paused = false;
  }
}

class Slash extends Projectile
{
	constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback)
	{
		super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback);
		this.attached = owner;
		this.done = false;
	}
	
	update()
	{
		if(!this.hitOnce)
		{
			this.testCollision();
		}
		this.testProjectileCollision();
		
		this.x = this.owner.x + this.dir.x * this.speed;
		this.y = this.owner.y + this.dir.y * this.speed;
	}
	
	testProjectileCollision()
	{
		
		let that = this;
		this.game.entities[LAYERS.ENEMY_PROJECTILES].forEach(function (elem) {
            if (circleToCircle(that, elem)) {
				let p = new Projectile(that.game, elem.x, elem.y, that.dir, that.owner.characterClass.stats.projectileSpeed, 3, true, that.owner, elem.animation, elem.dmg, elem.radius, elem.knockBack);
				elem.destroy();
                //that.destroy(); // this was kinda awesome btw.
            }
        });
	}
  
  destroy()
  {
    this.removeFromWorld = true;
    this.owner.progressBar.paused = false;
  }
}

class Shuriken extends EasingProjectile
{
	constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing, timeToSpawn)
	{
		super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback, move, easing, timeToSpawn);
    if(this.wallCollision({x: this.x, y: this.y}))
    {
      this.destroy();
    }
      this.timer.destroy();
      let that = this;
      this.timer = new TimerCallback(this.game, this.lifetime, false, function() {
      that.setDone();
		});
		this.done = false;
    
		this.knockBack = knockback;
	}
	
  update() {
		if(!this.done)
		{
			this.move();
			
			let newPos = {x: this.x, y: this.y};
      let backDir = normalizeV(this.dir);
			while (this.wallCollision({x: this.x, y: this.y})) {
				this.x -= backDir.x;
				this.y -= backDir.y;
				this.setDone();
			}
      this.testCollision();
			this.oldPos = newPos;
			
		}
		this.testPlayerCollision();
  }
	
	testCollision() {
        var that = this;

        if (this.animation.isDone()) {
            this.animation.pause();
            this.animation.setFrame(this.animation.getLastFrameAsInt());
        }

        if (this.owner instanceof Player) {
            //For each enemy
            this.game.entities[LAYERS.ENEMIES].forEach(function (elem) {
                if (that.done !== true) {
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        else{
                          let backDir = normalizeV(that.dir);
                          while (circleToCircle(that, elem)) {
                            console.log("HEY");
                            that.x -= backDir.x;
                            that.y -= backDir.y;
                            that.setDone();
                          }
                        }
                        elem.takeDamage(that.dmg, that.dir, that.knockBack);
                    }
                }
            });
            this.game.entities[LAYERS.OBJECTS].forEach(function (elem) {
                if (that.removeFromWorld !== true && elem.removeFromWorld !== true) {
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        else{
                          let backDir = normalizeV(that.dir);
                          while (circleToCircle(that, elem)) {
                                                        console.log(backDir.x + ", " + backDir.y);
                            that.x -= backDir.x;
                            that.y -= backDir.y;
                            that.setDone();
                          }
                        }
                        elem.takeDamage(that.dmg, that.dir, that.knockBack);
                    }
                }
            });
        } 
        else {
            if (circleToCircle(that, that.game.player)) {
                let attackedFromVector = normalizeV(dirV({x: this.x, y: this.y}, {
                    x: this.game.player.x,
                    y: this.game.player.y
                }));
                let attackedFromDir = vectorToDir(attackedFromVector);
                this.game.player.takeDmg(1, attackedFromDir);
            }
        }
    }
	
	testPlayerCollision()
	{
		if((this.done || this.timer.getPercent() > 0.3) && circleToCircle(this, this.owner))
		{
			this.destroy();
		}
	}
	
	setDone()
	{
		this.timer.pause();
		this.timer.destroy();
		this.animation.setFrame(6);
		this.animation.pause();
		this.done = true;
		let that = this;
    new TimerCallback(this.game, this.lifetime * 0.5, false, function (){ that.destroy(); });
	}
}

class Spin extends Slash
{
	constructor(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback)
	{
		super(game, x, y, dir, speed, lifetime, dieOnHit, owner, animation, dmg, radius, knockback);
		this.timer.destroy();
		let that = this;
		this.dmgTimer = new TimerCallback(that.game, 0.1, true, function () { that.testCollision(); });
		this.timer = new TimerCallback(that.game, that.lifetime, false,
			function()
			{ 
				that.destroy();
				that.owner.velocity.x = 0;
				that.owner.velocity.y = 0;
				that.owner.speed = that.owner.characterClass.stats.speed; 
        that.dmgTimer.destroy();
			}
		);
		this.attached = owner;
	}
	
	update()
	{
		this.testProjectileCollision();
		
		this.x = this.owner.x + this.dir.x * this.speed;
		this.y = this.owner.y + this.dir.y * this.speed;
	}
  
  testCollision() {
        var that = this;

        if (this.animation.isDone()) {
            this.animation.pause();
            this.animation.setFrame(this.animation.getLastFrameAsInt());
        }

        if (this.owner instanceof Player) {
            //For each enemy
            this.game.entities[LAYERS.ENEMIES].forEach(function (elem) {
                if (that.removeFromWorld !== true) {
                    let direction = normalizeV(dirV({x: that.x, y: that.y}, {x: elem.x, y: elem.y}));
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        elem.takeDamage(that.dmg, direction, that.knockBack);
                    }
                }
            });
            this.game.entities[LAYERS.OBJECTS].forEach(function (elem) {
                if (that.removeFromWorld !== true && elem.removeFromWorld !== true) {
                    if (circleToCircle(that, elem)) {
                        if (that.dieOnHit) {
                            that.destroy();
                        }
                        that.done = true;
                        elem.takeDamage(that.dmg, that.dir, that.knockBack);
                    }
                }
            });
            
        }
  }
  
	testProjectileCollision()
	{
		let that = this;
		this.game.entities[LAYERS.ENEMY_PROJECTILES].forEach(function (elem) {
            if (circleToCircle(that, elem)) {
                elem.destroy();
                //that.destroy(); // this was kinda awesome btw.
            }
        });
	}
  
  destroy()
  {
    this.removeFromWorld = true;
    this.owner.progressBar.paused = false;
  }
}