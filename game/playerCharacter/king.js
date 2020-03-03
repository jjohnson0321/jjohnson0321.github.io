function King() {
    //Load in the sprite sheets
    var mainSheet = ASSET_MANAGER.getAsset("./img/player_characters/King.png");
    var dmgSheet = ASSET_MANAGER.getAsset("./img/player_characters/KingDmgSheet.png");
    var peasants = ASSET_MANAGER.getAsset("./img/projectiles/Peasants.png");
    var arrows = ASSET_MANAGER.getAsset("./img/projectiles/Arrows.png");

    //Use to access all animations this character has
    this.animation = {
        //Left facing animations
        idleLeft: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 12}, {x: 3, y: 12},
            4, false, STANDARD_DRAW_SCALE),
        walkingLeft: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 3, y: 3},
            4, true, STANDARD_DRAW_SCALE),
        regAttackLeft: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 7}, {x: 3, y: 7},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackLeft: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 8}, {x: 3, y: 8},
            4, false, STANDARD_DRAW_SCALE); },
        dmgFromLeft: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 5, y: 1},
            6, false, STANDARD_DRAW_SCALE),

        //Right facing animations
        idleRight: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 11}, {x: 3, y: 11},
            4, false, STANDARD_DRAW_SCALE),
        walkingRight: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 3, y: 2},
            4, true, STANDARD_DRAW_SCALE),
        regAttackRight: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 6}, {x: 3, y: 6},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackRight: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 8}, {x: 3, y: 8},
            4, false, STANDARD_DRAW_SCALE); },
        dmgFromRight: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 5, y: 0},
            6, false, STANDARD_DRAW_SCALE),

        //Up facing animations
        idleUp: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 10}, {x: 3, y: 10},
            4, false, STANDARD_DRAW_SCALE),
        walkingUp: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 1}, {x: 3, y: 1},
            4, true, STANDARD_DRAW_SCALE),
        regAttackUp: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 5}, {x: 3, y: 5},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackUp: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 8}, {x: 3, y: 8},
            4, false, STANDARD_DRAW_SCALE); },
        dmgFromUp: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 3}, {x: 5, y: 3},
            6, false, STANDARD_DRAW_SCALE),

        //Down facing animations
        idleDown: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 9}, {x: 3, y: 9},
            4, false, STANDARD_DRAW_SCALE),
        walkingDown: new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 3, y: 0},
            4, true, STANDARD_DRAW_SCALE),
        regAttackDown: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 4}, {x: 3, y: 4},
            24, false, STANDARD_DRAW_SCALE); },
        specialAttackDown: function () { return new Animation(mainSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 8}, {x: 3, y: 8},
            4, false, STANDARD_DRAW_SCALE); },
        dmgFromDown: new Animation(dmgSheet,
            STANDARD_ENTITY_FRAME_WIDTH, STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 2}, {x: 5, y: 2},
            6, false, STANDARD_DRAW_SCALE),

        //Projectile animations
      regProjectile: function () { return new Animation(peasants,
        16, 16,
        {x: 0, y: 0}, {x: 1, y: 0},
        6, true, STANDARD_DRAW_SCALE); },
	
        //Special animations
      specialProjectile: function () { return new Animation(arrows,
        32, 32,
        {x: 0, y: 0}, {x: 2, y: 0},
        8, true, STANDARD_DRAW_SCALE * 3); }
    };
	
	let that = this;
	
	this.attack = function (player, attackVector) {
		
	};
	
	this.specialAttack = function (player, attackVector) {

    };

    this.collider = new Collider(0, 0, 14, 15, 10, 10, null, 150);

    this.stats = {
        maxHP: 5,
        speed: 50,
        melee: false,
        projectileSpeed: 300,
        projectileLifetime: 1.5,
        specialMelee: false,
        specialSpeed: 20,
        specialLifetime: 3,
        specialChargeTime: 10,
        specialChargeFromKill: 0,
        maxProjectiles: 2
    };
    this.npc = {
        x: -32 - 50,
        y: 50
    }
}