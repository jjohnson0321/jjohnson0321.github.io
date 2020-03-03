//S PlayerSpawner
//E End
//V Vertical
//H Horizontal
//

class Level2 {
    constructor() {
        this.width = 34;
        this.height = 16;
        this.floorType = 0;
        this.wallType = 0;
        this.nextLevel = Level3.prototype;
        this.musicId = 'hedgeMazeMusic';

        this.layout =
            "##################################" +
            "########------######----##########" +
            "S-----------------------------####" +
            "######V#------######----#####-####" +
            "######-########----######---#-####" +
            "######-########---------H-----####" +
            "#---##-------------######---##---#" +
            "###-##-#######################---#" +
            "###-##-##############----------###" +
            "#-------##------------#-------####" +
            "#-----------############-----#####" +
            "#-------######-------#####-#######" +
            "#-#########---------######-#######" +
            "#^#####-----##------######-#######" +
            "#-----------##############-------E" +
            "##################################";

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
                x: 20,
                y: 11,
                characterClass: new Ninja()
            });

        ////////////////////////////////////
        ///////////// ROOM 1 ///////////////
        ////////////////////////////////////
        this.roomSpawnerList.push({
                x: 22,
                y: 2,
                room: {upperLeft: {x: 20, y: 1}, bottomRight: {x: 23, y: 3}},
                lockCam: true,
                dropKey: false
            });
        this.spawnerList.push({
            x: 24,
            y: 1,
            max: 0,
            freq: 3,
            list: [PuddleJumper.prototype],
            rand: false,
            radius: 96,
            total: 2,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 24,
            y: 2,
            max: 0,
            freq: 3,
            list: [PuddleJumper.prototype],
            rand: false,
            radius: 96,
            total: 2,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 24,
            y: 3,
            max: 0,
            freq: 3,
            list: [PuddleJumper.prototype],
            rand: false,
            radius: 96,
            total: 2,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 20,
            y: 3,
            max: 0,
            freq: 3,
            list: [Bat.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 20,
            y: 1,
            max: 0,
            freq: 3,
            list: [Bat.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 21,
            y: 3,
            max: 0,
            freq: 3,
            list: [Bat.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 21,
            y: 1,
            max: 0,
            freq: 3,
            list: [Bat.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 22,
            y: 3,
            max: 0,
            freq: 3,
            list: [Bat.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 1,
            delay: 0
        });
        this.spawnerList.push({
            x: 22,
            y: 1,
            max: 0,
            freq: 3,
            list: [Bat.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 1,
            delay: 0
        });

        ////////////////////////////////////
        ///////////// ROOM 2 ///////////////
        ////////////////////////////////////
        this.pickupList.push({
            x: 27,
            y: 4,
            type: Key.prototype
        });

        this.roomSpawnerList.push({
            x: 27,
            y: 5,
            room: {upperLeft: {x: 25, y: 4}, bottomRight: {x: 29, y: 6}},
            lockCam: true,
            dropKey: false
        });
        this.spawnerList.push({
            x: 25,
            y: 4,
            max: 1,
            freq: 3,
            list: [StoneGolem.prototype],
            rand: false,
            radius: 288,
            total: 0,
            roomNum: 2,
            delay: 0
        });

        this.spawnerList.push({
            x: 25,
            y: 6,
            max: 1,
            freq: 3,
            list: [StoneGolem.prototype],
            rand: false,
            radius: 288,
            total: 0,
            roomNum: 2,
            delay: 0
        });

        this.spawnerList.push({
            x: 27,
            y: 6,
            max: 1,
            freq: 3,
            list: [StoneGolem.prototype],
            rand: false,
            radius: 288,
            total: 0,
            roomNum: 2,
            delay: 0
        });


        // Pickups in first shortcut
        this.pickupList.push({
            x: 6,
            y: 4,
            type: Key.prototype
        });
        this.pickupList.push({
            x: 8,
            y: 6,
            type: HealthPotion.prototype
        });

        ////////////////////////////////////
        ///////////// ROOM 3 ///////////////
        ////////////////////////////////////
        this.pickupList.push({
            x: 1,
            y: 6,
            type: SpecialKey.prototype
        });
        this.roomSpawnerList.push({
            x: 4,
            y: 10,
            room: {upperLeft: {x: 1, y: 9}, bottomRight: {x: 7, y: 11}},
            lockCam: true,
            dropKey: false
        });
        this.spawnerList.push({
            x: 1,
            y: 8,
            max: 1,
            freq: 7,
            list: [Snek.prototype],
            rand: false,
            radius: 4 * 96,
            total: 3,
            roomNum: 3,
            delay: 0
        });
        this.spawnerList.push({
            x: 7,
            y: 8,
            max: 1,
            freq: 7,
            list: [Snek.prototype],
            rand: false,
            radius: 4 * 96,
            total: 3,
            roomNum: 3,
            delay: 0
        });
        this.spawnerList.push({
            x: 1,
            y: 12,
            max: 4,
            freq: 7,
            list: [Bat.prototype],
            rand: false,
            radius: 4 * 96,
            total: 4,
            roomNum: 3,
            delay: 0
        });
        this.spawnerList.push({
            x: 7,
            y: 12,
            max: 4,
            freq: 7,
            list: [Bat.prototype],
            rand: false,
            radius: 4 * 96,
            total: 4,
            roomNum: 3,
            delay: 0
        });
        this.spawnerList.push({
            x: 0,
            y: 11,
            max: 1,
            freq: 7,
            list: [Skeleton.prototype],
            rand: false,
            radius: 4 * 96,
            total: 1,
            roomNum: 3,
            delay: 0
        });
        this.spawnerList.push({
            x: 8,
            y: 11,
            max: 1,
            freq: 7,
            list: [Skeleton.prototype],
            rand: false,
            radius: 4 * 96,
            total: 1,
            roomNum: 3,
            delay: 0
        });

        ////////////////////////////////////
        ///////////// ROOM 4 ///////////////
        ////////////////////////////////////
        this.roomSpawnerList.push({
            x: 17,
            y: 5,
            room: {upperLeft: {x: 15, y: 4}, bottomRight: {x: 19, y: 6}},
            lockCam: true,
            dropKey: false
        });
        this.spawnerList.push({
            x: 13,
            y: 6,
            max: 1,
            freq: 7,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 4 * 96,
            total: 1,
            roomNum: 4,
            delay: 0
        });
        this.spawnerList.push({
            x: 12,
            y: 6,
            max: 1,
            freq: 7,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 4 * 96,
            total: 1,
            roomNum: 4,
            delay: 0
        });
        this.spawnerList.push({
            x: 11,
            y: 6,
            max: 1,
            freq: 7,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 4 * 96,
            total: 1,
            roomNum: 4,
            delay: 0
        });

        ////////////////////////////////////
        ///////////// ROOM 5 ///////////////
        ////////////////////////////////////
        this.roomSpawnerList.push({
            x: 26,
            y: 9,
            room: {upperLeft: {x: 24, y: 8}, bottomRight: {x: 28, y: 10}},
            lockCam: true,
            dropKey: false
        });
        this.spawnerList.push({
            x: 25,
            y: 11,
            max: 1,
            freq: 10,
            list: [Skeleton.prototype],
            rand: false,
            radius: 96 * 4,
            total: 3,
            roomNum: 5,
            delay: 0
        });
        this.spawnerList.push({
            x: 27,
            y: 11,
            max: 1,
            freq: 10,
            list: [Skeleton.prototype],
            rand: false,
            radius: 96 * 4,
            total: 3,
            roomNum: 5,
            delay: 0
        });
        this.spawnerList.push({
            x: 26,
            y: 9,
            max: 1,
            freq: 10,
            list: [Snek.prototype],
            rand: false,
            radius: 96 * 4,
            total: 1,
            roomNum: 5,
            delay: 0
        });
        this.spawnerList.push({
            x: 25,
            y: 7,
            max: 3,
            freq: 10,
            list: [PuddleJumper.prototype],
            rand: false,
            radius: 96 * 4,
            total: 0,
            roomNum: 5,
            delay: 0
        });
        this.spawnerList.push({
            x: 27,
            y: 7,
            max: 3,
            freq: 10,
            list: [PuddleJumper.prototype],
            rand: false,
            radius: 96 * 4,
            total: 0,
            roomNum: 5,
            delay: 0
        });
        this.spawnerList.push({
            x: 23,
            y: 9,
            max: 1,
            freq: 10,
            list: [StoneGolem.prototype],
            rand: false,
            radius: 96 * 2,
            total: 1,
            roomNum: 5,
            delay: 0
        });
        this.spawnerList.push({
            x: 29,
            y: 9,
            max: 1,
            freq: 10,
            list: [StoneGolem.prototype],
            rand: false,
            radius: 96 * 5,
            total: 1,
            roomNum: 5,
            delay: 0
        });

        ////////////////////////////////////
        ///////////// ROOM 6 ///////////////
        ////////////////////////////////////
        this.roomSpawnerList.push({
            x: 17,
            y: 12,
            room: {upperLeft: {x: 14, y: 11}, bottomRight: {x: 19, y: 14}},
            lockCam: true,
            dropKey: false
        });
        this.spawnerList.push({
            x: 14,
            y: 11,
            max: 1,
            freq: 10,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 6,
            delay: 0
        });
        this.spawnerList.push({
            x: 14,
            y: 13,
            max: 1,
            freq: 10,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 6,
            delay: 0
        });
        this.spawnerList.push({
            x:19,
            y: 11,
            max: 1,
            freq: 10,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 6,
            delay: 0
        });
        this.spawnerList.push({
            x: 19,
            y: 13,
            max: 1,
            freq: 10,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 6,
            delay: 0
        });
        this.spawnerList.push({
            x: 16,
            y: 12,
            max: 1,
            freq: 10,
            list: [CactusBoi.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 6,
            delay: 0
        });

        ////////////////////////////////////
        ///////////// ROOM 7 ///////////////
        ////////////////////////////////////
        this.roomSpawnerList.push({
            x: 9,
            y: 13.5,
            room: {upperLeft: {x: 7, y: 13}, bottomRight: {x: 11, y: 15}},
            lockCam: true,
            dropKey: false,
            dropPotion: true
        });
        this.spawnerList.push({
            x: 9,
            y: 13.5,
            max: 1,
            freq: 10,
            list: [Snek.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 7,
            delay: 0
        });

        //Guarding key to snek room
        this.spawnerList.push({
            x: 4,
            y: 6,
            max: 1,
            freq: 10,
            list: [Skeleton.prototype],
            rand: false,
            radius: 96,
            total: 1,
            roomNum: 0,
            delay: 0
        });
        // Charges into room 5 and follows you to end
        this.spawnerList.push({
            x: 26,
            y: 14,
            max: 1,
            freq: 5,
            list: [StoneGolem.prototype],
            rand: false,
            radius: 96 * 6,
            total: 0,
            roomNum: 0,
            delay: 0
        });
        //Sneaky sneak.
        this.spawnerList.push({
            x: 30,
            y: 6,
            max: 1,
            freq: 10,
            list: [HedgeMonster.prototype],
            rand: false,
            radius: 10000,
            total: 1,
            roomNum: 0,
            delay: 0
        });

        /////////////////////////////////
        //////////// HAZARDS ////////////
        /////////////////////////////////

        this.turretList.push(
            {
                x: 8,
                y: 2,
                fireRate: 10,
                spinning: true,
                cross: false,
                pSpeed: 75,
                pLifeTime: 3,
                pMove: EasingProjectile.prototype.circle,
                pEasing: function (t) {
                    return 0;
                },
                initialDelay: 0,
                burstDelay: 0,
                burstNum: 1
            });

        this.turretList.push(
            {
                x: 10,
                y: 1,
                fireRate: 10,
                spinning: true,
                cross: false,
                pSpeed: 75,
                pLifeTime: 3,
                pMove: EasingProjectile.prototype.circle,
                pEasing: function (t) {
                    return 0.5;
                },
                initialDelay: 0,
                burstDelay: 0,
                burstNum: 1
            });

        this.turretList.push(
            {
                x: 10,
                y: 3,
                fireRate: 10,
                spinning: true,
                cross: false,
                pSpeed: 75,
                pLifeTime: 3,
                pMove: EasingProjectile.prototype.circle,
                pEasing: function (t) {
                    return 0.42;
                },
                initialDelay: 0,
                burstDelay: 0,
                burstNum: 1
            });

        this.turretList.push(
            {
                x: 13,
                y: 2,
                fireRate: 6,
                spinning: true,
                cross: false,
                pSpeed: 100,
                pLifeTime: 2,
                pMove: EasingProjectile.prototype.spiral,
                pEasing: function (t) {
                    return smoothStopN(t, 2);
                },
                initialDelay: 0,
                burstDelay: 0,
                burstNum: 1
            });

        this.turretList.push(
            {
                x: 13,
                y: 2,
                fireRate: 6,
                spinning: true,
                cross: false,
                pSpeed: 100,
                pLifeTime: 4,
                pMove: EasingProjectile.prototype.spiral,
                pEasing: function (t) {
                    return smoothStopN(t, 2);
                },
                initialDelay: 0,
                burstDelay: 0,
                burstNum: 1
            });

        this.turretList.push(
            {
                x: 13,
                y: 2,
                fireRate: 6,
                spinning: true,
                cross: false,
                pSpeed: 100,
                pLifeTime: 5,
                pMove: EasingProjectile.prototype.spiral,
                pEasing: function (t) {
                    return smoothStopN(t, 2);
                },
                initialDelay: 0,
                burstDelay: 0,
                burstNum: 1
            });
    }
}
