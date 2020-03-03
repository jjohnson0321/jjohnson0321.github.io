class Level1
{
	constructor()
	{
		this.width = 20;
		this.height = 20;
		this.floorType = 3;
		this.wallType = 1;
		this.nextLevel = Level2.prototype;
		this.musicId = 'churchMusic';

		this.layout = 
		"####################" +
		"S---#-#------#-----#" +
		"###---H------H-----#" +
		"#######------#-----#" +
		"###############--###" +
    
		"#----------##------#" +
		"#-#####-----#------#" +
		"#-------###-#------#" +
		"####V####-#-H------#" +
		"#----####-##########" +
    
		"#----####-##########" +
		"#-######--##########" +
		"#--------###########" +
		"#------#############" +
		"#----###############" +
    
		"##--################" +
		"##------#########-##" +
		"##------#########V##" +
		"####---------------E" +
		"####################";
		
		this.playerSpawner = null;
		/*this.playerSpawner = {
            maxAtOnce: 1,
            spawnList:
            [Bat.prototype, CactusBoi.prototype,
            PuddleJumper.prototype, Skeleton.prototype, Snek.prototype,
            StoneGolem.prototype],
            probs: [50, 10, 40, 35, 25, 15]
        };*/


		this.roomSpawnerList = [];
		this.spawnerList = [];
		this.turretList = [];
		this.spawnerProjectileList = [];
		this.pickupList = [];
    	this.unlockableCharacter = [];
    
    this.unlockableCharacter.push(
    {
      x: 17,
      y: 16,
      characterClass: new Lancer()
    });

    this.pickupList.push({
			x: 5,
			y: 1,
			type: Key.prototype
		});
    this.pickupList.push({
			x: 1,
			y: 6,
			type: Key.prototype
		});
		//room 1
		this.roomSpawnerList.push (
		{
			x: 9.75,
			y: 2,
			room: {upperLeft: {x: 6, y: 1}, bottomRight: {x: 13, y: 4}},
      lockCam: true,
			dropKey: true
		});
		
		this.spawnerList.push (
		{
			x: 7,
			y: 1,
			max: 0,
			freq: 3,
			list: [Bat.prototype],
			rand: false,
			radius: 96,
			total: 2,
			roomNum: 1,
      delay: 0
		});
				
		this.spawnerList.push (
		{
			x: 8,
			y: 1,
			max: 0,
			freq: 3,
			list: [Bat.prototype],
			rand: false,
			total: 2,
			roomNum: 1,
      delay: 0
		});
				
		this.spawnerList.push (
		{
			x: 9,
			y: 1,
			max: 0,
			freq: 3,
			list: [Bat.prototype],
			rand: false,
			radius: 96,
			total: 2,
			roomNum: 1,
      delay: 0
		});
				
		this.spawnerList.push (
		{
			x: 10,
			y: 1,
			max: 0,
			freq: 3,
			list: [Bat.prototype],
			rand: false,
			radius: 96,
			total: 2,
			roomNum: 1,
      delay: 0
		});	
		
		this.spawnerList.push (
		{
			x: 11,
			y: 1,
			max: 0,
			freq: 3,
			list: [Bat.prototype],
			rand: false,
			radius: 96,
			total: 2,
			roomNum: 1,
      delay: 0
		});		
		
		this.spawnerList.push (
		{
			x: 12,
			y: 1,
			max: 0,
			freq: 3,
			list: [Bat.prototype],
			rand: false,
			radius: 96,
			total: 2,
			roomNum: 1,
      delay: 0
		});
    
    this.pickupList.push({
			x: 7,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 7.5,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 8,
			y: 3.25,
			type: Crate.prototype
		}); 
    this.pickupList.push({
			x: 8.5,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 9,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 9.5,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 10,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 10.5,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 11,
			y: 3.25,
			type: Crate.prototype
		}); 
    this.pickupList.push({
			x: 11.5,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 12,
			y: 3.25,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 7,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 7.5,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 8,
			y: 2.75,
			type: Crate.prototype
		}); 
    this.pickupList.push({
			x: 8.5,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 9,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 9.5,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 10,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 10.5,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 11,
			y: 2.75,
			type: Crate.prototype
		}); 
    this.pickupList.push({
			x: 11.5,
			y: 2.75,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 12,
			y: 2.75,
			type: Crate.prototype
		});
    
    //Room 2
    this.turretList.push (
    {
      x: 14.5,
      y: 3.5,
      fireRate: 3,
      spinning: false,
      cross: false,
      pDirection: 0.75,
      pSpeed: 96*2,
      pLifeTime: 4,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 0,
      burstNum: 1
    });    
    
    this.turretList.push (
    {
      x: 14.5,
      y: 1.5,
      fireRate: 3,
      spinning: false,
      cross: false,
      pDirection: 0.0,
      pSpeed: 96 * 3,
      pLifeTime: 6,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 0,
      burstNum: 1
    });   
    
    this.turretList.push (
    {
      x: 17.5,
      y: 1.5,
      fireRate: 3,
      spinning: false,
      cross: false,
      pDirection: 0.25,
      pSpeed: 96 * 1,
      pLifeTime: 2,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 0,
      burstNum: 1
    });
    
    this.turretList.push (
    {
      x: 17.5,
      y: 2.5,
      fireRate: 3,
      spinning: false,
      cross: false,
      pDirection: 0.5,
      pSpeed: 96 * 2,
      pLifeTime: 4,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 0,
      burstNum: 1
    });
		this.spawnerProjectileList.push (
    {
      x: 15.5,
      y: 3.5,
      dir: {x: 1, y: 0},
      speed: 0,
      lifeTime: 5,
      dieOnHit: false,
      owner: null,
      dmg: 0,
      radius: -100,
      knockback: 0,
      move: EasingProjectile.prototype.line,
      easing: function (t) {return t;},
      timeToSpawn: 1/60,
      attach: true,
      shots: 10,
      circleTime: 5,
      loop: true,
      spawnDirections: {up: true, down: true, left: true, right: true}
    });

		this.pickupList.push({
			x: 17,
			y: 2,
			type: StarPotion.prototype
		});
    
    // Room 3: num 2
    this.roomSpawnerList.push (
		{
			x: 15.5,
			y: 6.5,
			room: {upperLeft: {x: 12, y: 5}, bottomRight: {x: 18, y: 9}},
      lockCam: true,
			dropKey: true
		});
		
		this.spawnerList.push (
		{
			x: 13,
			y: 5,
			max: 1,
			freq: 3,
			list: [Snuk.prototype],
			rand: false,
			radius: 96,
			total: 1,
			roomNum: 2,
      delay: 0
		});		
		this.spawnerList.push (
		{
			x: 18,
			y: 5,
			max: 1,
			freq: 3,
			list: [Snuk.prototype],
			rand: false,
			radius: 96,
			total: 1,
			roomNum: 2,
      delay: 0
		});		
		this.spawnerList.push (
		{
			x: 13,
			y: 8,
			max: 1,
			freq: 3,
			list: [Snek.prototype],
			rand: false,
			radius: 96,
			total: 1,
			roomNum: 2,
      delay: 0
		});		
		this.spawnerList.push (
		{
			x: 18,
			y: 8,
			max: 1,
			freq: 3,
			list: [Snak.prototype],
			rand: false,
			radius: 96,
			total: 1,
			roomNum: 2,
      delay: 0
		});
    this.pickupList.push({
			x: 15,
			y: 6,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 16,
			y: 6,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 15,
			y: 7,
			type: Crate.prototype
		});
    this.pickupList.push({
			x: 16,
			y: 7,
			type: Crate.prototype
		});
    
	
	// room 4
    this.pickupList.push(
    {
      x: 10,
      y: 5,
      type: HealthPotion.prototype
    });
    
    this.roomSpawnerList.push (
		{
			x: 15.5,
			y: 6.5,
			room: {upperLeft: {x: 3, y: 5}, bottomRight: {x: 9, y: 7}},
      lockCam: false,
			dropKey: false
		});
    this.spawnerList.push (
		{
			x: 1,
			y: 4.75,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 1,
			y: 5.25,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 1.25,
			y: 5,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 1.5,
			y: 4.75,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 1.5,
			y: 5.25,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 1.75,
			y: 5,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
        this.spawnerList.push (
		{
			x: 2,
			y: 4.75,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 2,
			y: 5.25,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
    this.spawnerList.push (
		{
			x: 2.25,
			y: 5,
			max: 0,
			freq: 4,
			list: [LineJumper.prototype],
			rand: false,
			radius: 96,
			total: 0,
			roomNum: 3,
      delay: 0
		});
	this.turretList.push (
    {
      x: 0.5,
      y: 6.75,
      fireRate: 9,
      spinning: false,
      cross: false,
      pDirection: 0,
      pSpeed: 96 * 7,
      pLifeTime: 5,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 3,
      burstNum: 3
    });
    
    this.turretList.push (
    {
      x: 0.5,
      y: 7,
      fireRate: 9,
      spinning: false,
      cross: false,
      pDirection: 0,
      pSpeed: 96 * 7,
      pLifeTime: 5,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 3,
      burstNum: 3
    });
    
    this.turretList.push (
    {
      x: 0.5,
      y: 7.25,
      fireRate: 9,
      spinning: false,
      cross: false,
      pDirection: 0,
      pSpeed: 96 * 7,
      pLifeTime: 5,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 3,
      burstNum: 3
    });
    /*   
    this.turretList.push (
    {
      x: 0.5,
      y: 6.75,
      fireRate: 9,
      spinning: false,
      cross: false,
      pDirection: 0,
      pSpeed: 96 * 7,
      pLifeTime: 5,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 0,
      burstDelay: 4,
      burstNum: 5
    });
    
    this.turretList.push (
    {
      x: 0.5,
      y: 7,
      fireRate: 9,
      spinning: false,
      cross: false,
      pDirection: 0,
      pSpeed: 96 * 7,
      pLifeTime: 5,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 1,
      burstDelay: 4,
      burstNum: 5
    });
    
    this.turretList.push (
    {
      x: 0.5,
      y: 7.25,
      fireRate: 9,
      spinning: false,
      cross: false,
      pDirection: 0,
      pSpeed: 96 * 7,
      pLifeTime: 5,
      pMove: EasingProjectile.prototype.line,
      pEasing: function (t) { return t; },
      initialDelay: 2,
      burstDelay: 4,
      burstNum: 5
    });*/
    this.pickupList.push(
    {
      x: 1,
      y: 9,
      type: HealthPotion.prototype
    });
    this.pickupList.push(
    {
      x: 2,
      y: 9,
      type: HealthPotion.prototype
    });
    
    this.pickupList.push(
    {
      x: 7,
      y: 9,
      type: Key.prototype
    });
    this.roomSpawnerList.push (
		{
			x: 9,
			y: 9.5,
			room: {upperLeft: {x: 9, y: 8}, bottomRight: {x: 9, y: 11}},
      lockCam: true,
			dropKey: false
		});
    this.spawnerList.push (
		{
			x: 7,
			y: 12,
			max: 1,
			freq: 10,
			list: [Bat.prototype],
			rand: false,
			radius: 96,
			total: 1,
			roomNum: 4,
      delay: Number.POSITIVE_INFINITY
		});
    
    this.roomSpawnerList.push (
		{
			x: 9,
			y: 8,
			room: {upperLeft: {x: 9, y: 8}, bottomRight: {x: 9, y: 8}},
      lockCam: false,
			dropKey: false
		});
    this.spawnerList.push (
		{
			x: 9,
			y: 11,
			max: 1,
			freq: 10,
			list: [StoneGolem.prototype],
			rand: false,
			radius: 96,
			total: 1,
			roomNum: 5,
      delay: 0
		});
    
    this.turretList.push (
    {
        x: 5,
        y: 13.5,
        fireRate: 9,
        spinning: false,
        cross: false,
        pDirection: 0.75,
        pSpeed: 96 * 2,
        pLifeTime: 1,
        pMove: EasingProjectile.prototype.line,
        pEasing: function (t) { return t; },
        initialDelay: 0,
        burstDelay: 2,
        burstNum: 10
    });
    
    this.roomSpawnerList.push (
		{
			x: 4.5,
			y: 17,
			room: {upperLeft: {x: 2, y: 16}, bottomRight: {x: 8, y: 19}},
      lockCam: true,
			dropKey: false
		});
    this.spawnerList.push (
		{
			x: 7,
			y: 16,
			max: 1,
			freq: 4,
			list: [Snek.prototype],
			rand: false,
			radius: 96,
			total: 3,
			roomNum: 6,
      delay: 0
		});
    
    this.roomSpawnerList.push (
		{
			x: 17,
			y: 17,
			room: {upperLeft: {x: 15, y: 15}, bottomRight: {x: 19, y: 18}},
      lockCam: true,
			dropKey: false
		});
    this.spawnerList.push (
		{
			x: 7,
			y: 16,
			max: 1,
			freq: 4,
			list: [Snek.prototype],
			rand: false,
			radius: 96,
			total: 3,
			roomNum: 7,
      delay: Number.POSITIVE_INFINITY
		});
    this.pickupList.push(
    {
      x: 9,
      y: 8,
      type: Key.prototype
    });
	}
}