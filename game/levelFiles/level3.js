class Level3 {
    constructor() {
        this.width = 15;
        this.height = 11;
        this.floorType = 0;
        this.wallType = 0;
        this.nextLevel = null;
        this.musicId = 'hedgeMonsterMusic';

        /*this.layout =
            "##########J" +
            "S--------#J" +
            "#--------#J" +
            "#--------#J" +
            "#--------#J" +
            "#--------#J" +
            "#--------#J" +
            "#--------#J" +
            "#--------HE" +
            "##########J";*/

        this.layout =
            "oooooo#####oooo" +
            "oooo###---###oo" +
            "oooo#-------#oo" +
            "ooo##-------##o" +
            "####---------#o" +
            "S------------HE" +
            "####---------#o" +
            "ooo##-------##o" +
            "oooo#-------#oo" +
            "oooo###---###oo" +
            "oooooo#####oooo";

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
		
        this.roomSpawnerList.push({
                x: 8,
                y: 5,
                room: {upperLeft: {x: 3, y: 0}, bottomRight: {x: 14, y: 10}},
                lockCam: true,
                dropKey: true, // drops a key at this. x, y
				dropPotion: false,
				zoom: DEFAULT_ZOOM * 6
		});
			
		this.spawnerList.push (
		{
			x: 8,
			y: 3,
			max: 1,
			freq: 0,
			list: [MagmaGolem.prototype],
			rand: false,
			radius: 10000,
			total: 1,
			roomNum: 1,
			delay: 1
		});	

	}
}