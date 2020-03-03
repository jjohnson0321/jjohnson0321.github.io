function Lancer() {
    //Load all the spritesheets
    var sideToSide = ASSET_MANAGER.getAsset("./img/player_characters/LancerSideToSideSheet.png");
    var upAndDown = ASSET_MANAGER.getAsset("./img/player_characters/LancerUpDownSheet.png");
    var specialSheet = ASSET_MANAGER.getAsset("./img/player_characters/LancerSpecialMoveAllDirections.png");
    var dmgSheet = ASSET_MANAGER.getAsset("./img/player_characters/LancerDmgSheet.png");
    var specialSlash = ASSET_MANAGER.getAsset("./img/projectiles/SpinToWin.png");
    var regPoke = ASSET_MANAGER.getAsset("./img/projectiles/PokeSheet.png");


    //Use to access all animations this character uses
    this.animation = {
        //Left facing animations
        idleLeft: new Animation(sideToSide,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            6, false, STANDARD_DRAW_SCALE),
        walkingLeft: new Animation(sideToSide,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 5, y: 1},
            12, true, STANDARD_DRAW_SCALE),
        regAttackLeft: function () { return new Animation(sideToSide,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 5, y: 2},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackLeft: function () { return new Animation(specialSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 5, y: 0}, {x: 4, y: 0},
            24, true, STANDARD_DRAW_SCALE); },
        dmgFromLeft: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 5, y: 1},
            6, false, STANDARD_DRAW_SCALE),

        //Right facing animations
        idleRight: new Animation(sideToSide,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 5, y: 3},
            6, false, STANDARD_DRAW_SCALE),
        walkingRight: new Animation(sideToSide,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 4}, {x: 5, y: 4},
            12, true, STANDARD_DRAW_SCALE),
        regAttackRight: function() { return new Animation(sideToSide,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 5}, {x: 5, y: 5},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackRight: function () { return new Animation(specialSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 2, y: 0}, {x: 1, y: 0},
            24, true, STANDARD_DRAW_SCALE); },
        dmgFromRight: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            6, false, STANDARD_DRAW_SCALE),

        //Up facing animations
        idleUp: new Animation(upAndDown,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 5, y: 3},
            6, false, STANDARD_DRAW_SCALE),
        walkingUp: new Animation(upAndDown,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 4}, {x: 5, y: 4},
            12, true, STANDARD_DRAW_SCALE),
        regAttackUp: function () { return new Animation(upAndDown,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 5}, {x: 5, y: 5},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackUp: function () { return new Animation(specialSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 3, y: 0}, {x: 2, y: 0},
            24, true, STANDARD_DRAW_SCALE); },
        dmgFromUp: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 5, y: 3},
            6, false, STANDARD_DRAW_SCALE),

        //Down facing animations
        idleDown: new Animation(upAndDown,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            6, false, STANDARD_DRAW_SCALE),
        walkingDown: new Animation(upAndDown,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 5, y: 1},
            12, true, STANDARD_DRAW_SCALE),
        regAttackDown: function () { return new Animation(upAndDown,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 5, y: 2},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackDown: function () { return new Animation(specialSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            24, true, STANDARD_DRAW_SCALE); },
        dmgFromDown: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 5, y: 2},
            6, false, STANDARD_DRAW_SCALE),

        //Projectile animations
        regProjectileUp: function() { return new Animation(regPoke,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            20, false, STANDARD_DRAW_SCALE, 3); },
        regProjectileDown: function () { return new Animation(regPoke,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 3, y: 1},
            20,false, STANDARD_DRAW_SCALE, 3); },
        regProjectileLeft: function () { return new Animation(regPoke,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 3, y: 2},
            20, false, STANDARD_DRAW_SCALE, 3); },
        regProjectileRight: function () { return new Animation(regPoke,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 3, y: 3},
            20, false, STANDARD_DRAW_SCALE, 3); },
			
		//Special animations
        specialProjectile: function() { return new Animation(specialSlash,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            16, true, STANDARD_DRAW_SCALE*6); }
    };

	this.attack = function (player, attackVector)
	{	
		let projectileAnimation = null;
		switch (player.direction) {
			case DIRECTION_DOWN:
				projectileAnimation = player.characterClass.animation.regProjectileDown();
				break;
			case DIRECTION_UP:
				projectileAnimation = player.characterClass.animation.regProjectileUp();
				break;
			case DIRECTION_LEFT:
				projectileAnimation = player.characterClass.animation.regProjectileLeft();
				break;
			default:
				projectileAnimation = player.characterClass.animation.regProjectileRight();
				break;
		}
		let projectile = new Projectile(player.game,
			player.x, player.y,
			attackVector,
			player.characterClass.stats.projectileSpeed, player.characterClass.stats.projectileLifetime,
			false, player, projectileAnimation,
			2, 40, 10); // slowed down projectile for debugging
      projectile.attachTo(player);
      projectile.hitOnce();
      projectile.GiveBackAmmo();
	};
	
	this.specialAttack = function (player, attackVector)
	{
    new TimerCallback(player.game, player.characterClass.stats.specialLifetime, false, function() {
        player.isAttacking = false;
        player.animation = player.idleAnimation;
        player.animation.resetAnimation();
        player.animation.pause();
    });

    let projectile = new Spin(player.game, player.x, player.y, attackVector, player.characterClass.stats.specialSpeed, player.characterClass.stats.specialLifetime, false, player, player.characterClass.animation.specialProjectile(), 1, 85, 5);
    projectile.attachTo(player);
	};

    this.collider = new Collider(0, 0, 14, 14, 9, 9, null, 120);

    this.stats = {
        maxHP: 3,
        speed: 250, //speed: 250
        melee: true,
        projectileSpeed: 50,
        projectileLifetime: 0.3,
        specialMelee: true,
        specialSpeed: 0,
        specialLifetime: 3,
        specialChargeTime: 10,
        specialChargeFromKill: 0,
        maxProjectiles: 1
    };

    this.npc = {
        x: -32,
        y: 50
    }
}