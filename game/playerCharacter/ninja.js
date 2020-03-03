function Ninja() {
    //Load in the sprite sheets
    var spriteSheet = ASSET_MANAGER.getAsset("./img/player_characters/Ninja.png");
    var dmgSheet = ASSET_MANAGER.getAsset("./img/player_characters/NinjaDmgSheet.png");
    var shuriken = ASSET_MANAGER.getAsset("./img/projectiles/Shuriken.png");
    var slash = ASSET_MANAGER.getAsset("./img/projectiles/PureSlash.png");
    var airSlash = ASSET_MANAGER.getAsset("./img/projectiles/AirSlash.png");

    //Use to access all animations this character has
    this.animation = {
        //Left facing animations
        idleLeft: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 4, y: 2}, {x: 4, y: 3},
            6, false, STANDARD_DRAW_SCALE),
        walkingLeft: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 8}, {x: 4, y: 9},
            10, true, STANDARD_DRAW_SCALE),
        regAttackLeft: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 9}, {x: 4, y: 10},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackLeft: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 10}, {x: 4, y: 11},
            10, false, STANDARD_DRAW_SCALE); },
        dmgFromLeft: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 5, y: 3},
            6, false, STANDARD_DRAW_SCALE),

        //Right facing animations
        idleRight: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 4, y: 2}, {x: 4, y: 3},
            6, false, STANDARD_DRAW_SCALE),
        walkingRight: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 3}, {x: 4, y: 4},
            10, true, STANDARD_DRAW_SCALE),
        regAttackRight: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 4}, {x: 4, y: 5},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackRight: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 5}, {x: 4, y: 6},
            10, false, STANDARD_DRAW_SCALE); },
        dmgFromRight: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 5, y: 1},
            6, false, STANDARD_DRAW_SCALE),

        //Up facing animations
        idleUp: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 4, y: 2}, {x: 4, y: 3},
            6, false, STANDARD_DRAW_SCALE),
        walkingUp: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 6}, {x: 2, y: 7},
            10, true, STANDARD_DRAW_SCALE),
        regAttackUp: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 3, y: 7}, {x: 0, y: 8},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackUp: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 1, y: 8}, {x: 4, y: 8},
            10, false, STANDARD_DRAW_SCALE); },
        dmgFromUp: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 5, y: 2},
            6, false, STANDARD_DRAW_SCALE),

        //Down facing animations
        idleDown: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 4, y: 2}, {x: 4, y: 3},
            6, false, STANDARD_DRAW_SCALE),
        walkingDown: new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            10, true, STANDARD_DRAW_SCALE),
        regAttackDown: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 0}, {x: 1, y: 1},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackDown: function () { return new Animation(spriteSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 2, y: 1}, {x: 5, y: 1},
            10, false, STANDARD_DRAW_SCALE); },
        dmgFromDown: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            6, false, STANDARD_DRAW_SCALE),

        //Projectile animations
        regProjectile: function () { return new Animation(shuriken,
        STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
        {x: 0, y: 0}, {x: 7, y: 0},
        24, true, STANDARD_DRAW_SCALE); },
			
		//Special Projectile animations
        specialProjectile1Up: function() { return new Animation(slash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 3, y: 2},
            30, false, STANDARD_DRAW_SCALE*3); },
        specialProjectile1Down: function () { return new Animation(slash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 3, y: 3},
            30, false, STANDARD_DRAW_SCALE*3); },
        specialProjectile1Left: function () { return new Animation(slash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            30, false, STANDARD_DRAW_SCALE*3); },
        specialProjectile1Right: function () { return new Animation(slash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 3, y: 1},
            30, false, STANDARD_DRAW_SCALE*3); },

        specialProjectile2Up: function() { return new Animation(airSlash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 1, y: 1},
            12, true, STANDARD_DRAW_SCALE, 3); },
        specialProjectile2Down: function () { return new Animation(airSlash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 1, y: 3},
            12, true, STANDARD_DRAW_SCALE, 3); },
        specialProjectile2Left: function () { return new Animation(airSlash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 1, y: 2},
            12, true, STANDARD_DRAW_SCALE, 3); },
        specialProjectile2Right: function () { return new Animation(airSlash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 1, y: 0},
            12, true, STANDARD_DRAW_SCALE, 3); }
    };

	let that = this;
	
	this.attack = function (player, attackVector)
	{
    let projectileAnimation = that.animation.regProjectile();
    let perpDir = perpendicularV(attackVector);
    let count = 1;
    let pos = {x: player.x + perpDir.x, y: player.y};
        
    let spaceBetween = 5;
        
    for(let i = 0; i < count; i++)
    {
      new TimerCallback(player.game, i * 0.05, false, function () {
        let projectile = new Shuriken(player.game,
          pos.x - perpDir.x * i * spaceBetween, pos.y - perpDir.y * i * spaceBetween,
          attackVector,
          player.characterClass.stats.projectileSpeed, player.characterClass.stats.projectileLifetime,
          false, player, projectileAnimation,
          1.5, 1, 7, EasingProjectile.prototype.line, function(t) { return smoothStopN(t, 4); });
          projectile.GiveBackAmmo();
      });
    }
    
    
    /*
    let perpDir = perpendicularV(attackVector);
    let pos = {x: player.x + perpDir.x, y: player.y + perpDir.y};
    
    let that = this;
    let spaceBetween = 7;
    
    
    for(let i = 0; i < 3; i++)
    {
      new TimerCallback(player.game, i * 0.15, false, function () {
        let r = raycast({x: pos.x - perpDir.x * i*spaceBetween, y: pos.y - perpDir.y * i*spaceBetween}, {x: pos.x - perpDir.x * i*spaceBetween + attackVector.x, y: pos.y - perpDir.y * i*spaceBetween + attackVector.y}, 0.1, function (pt) 
          {
            for(let j = 0; j < player.game.entities[LAYERS.ENEMIES].length; j++)
            {
              let elem = player.game.entities[LAYERS.ENEMIES][j];
              if (elem.removeFromWorld !== true) {
                    if (circleToCircle(pt, elem)) {
                        return elem;
                    }
              }
            }
            for(let j = 0; j < player.game.entities[LAYERS.OBJECTS].length; j++)
            {
              let elem = player.game.entities[LAYERS.OBJECTS][j];
              if (elem.removeFromWorld !== true) {
                    if (circleToCircle(pt, elem)) {
                        return elem;
                    }
              }
            }
            return player.game._sceneManager.level.quickCollision(coordinateToIndex(pt.x), coordinateToIndex(pt.y));

          });


        let projectile = new Shuriken(player.game,
          r.x, r.y,
          attackVector,
          player.characterClass.stats.projectileSpeed, player.characterClass.stats.projectileLifetime,
          false, player, projectileAnimation,
          1.5, 5, 7, EasingProjectile.prototype.line, function(t) { return smoothStopN(t, 4); });
        projectile.GiveBackAmmo();
        projectile.setDone();
        
        if(r.elem !== true && r.elem !== false)
        {
          r.elem.takeDamage(1.5, attackVector, 5);
        }
      });
    }
    
    console.log(player.attackCounter);
    new TimerCallback(player.game, 0.5, false, function () {
      player.attackCounter--;
    });*/
	};
	
	this.specialAttack = function (player, attackVector)
	{
		let specialAnimation = null;
    let specialProjectileAnimation = null;

		switch (player.direction) {
			case DIRECTION_DOWN:
				specialAnimation = player.characterClass.animation.specialProjectile1Down();
				specialProjectileAnimation = player.characterClass.animation.specialProjectile2Down();
				break;
			case DIRECTION_UP:
				specialAnimation = player.characterClass.animation.specialProjectile1Up();
        specialProjectileAnimation = player.characterClass.animation.specialProjectile2Up();
				break;
			case DIRECTION_LEFT:
				specialAnimation = player.characterClass.animation.specialProjectile1Left();
        specialProjectileAnimation = player.characterClass.animation.specialProjectile2Left();
				break;
			default:
				specialAnimation = player.characterClass.animation.specialProjectile1Right();
        specialProjectileAnimation = player.characterClass.animation.specialProjectile2Right();
				break;
		}
		let projectile = new Slash(player.game, player.x, player.y, attackVector, player.characterClass.stats.specialSpeed, player.characterClass.stats.specialLifetime, false, player, specialAnimation, 4, 40, 10);
		projectile.attachTo(player);
		projectile.hitOnce();
    
    let dir = dirToVector(player.direction);
    new TimerCallback(player.game, 0.15, false, function () {new Projectile(player.game, player.x + dir.x * 50, player.y + dir.y * 50, dir, 300, 0.35, false, player, specialProjectileAnimation, 0.2, 40, 3);})
	};

    this.collider = new Collider(0, 0, 14, 15, 10, 10, null, 150);

    this.stats = {
        maxHP: 1,
        speed: 225,
        melee: false,
        projectileSpeed: 350,
        projectileLifetime: 1,
        specialMelee: true,
        specialSpeed: 10,
        specialLifetime: 0.25,
        specialChargeTime: 1,
        specialChargeFromKill: 0,
        maxProjectiles: 3,
    };
    this.npc = {
        x: -32 - 50,
        y: 0
    }
}