class Level4 {
    constructor() {
        this.width = 16;
        this.height = 9;
        this.floorType = 0;
        this.wallType = 0;
        this.nextLevel = null;
        this.musicId = 'bossMusic';

        this.layout =
            "#--------------#" +
            "#--------------#" +
            "#-PPPPPPPPPPPP-#" +
            "#-P----------P-#" +
            "#-P----------P-#" +
            "#-P----------P-#" +
            "##P----------P##" +
            "S-------------HE" +
            "################";

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
            x: 7.5,
            y: 3.5,
            room: {upperLeft: {x: 1, y: 0}, bottomRight: {x: 14, y: 7}},
            lockCam: true,
            dropKey: true, // drops a key at this. x, y
            dropPotion: false,
            zoom: DEFAULT_ZOOM * 5
        });

        this.spawnerList.push (
            {
                x: 4.5,
                y: 4.5,
                max: 1,
                freq: 3,
                list: [MagmaGolem.prototype],
                rand: false,
                radius: 10000,
                total: 1,
                roomNum: 1,
                delay: 0
            });

    }
}