const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/map/grounds.png");
ASSET_MANAGER.queueDownload("./img/map/walls.png");
ASSET_MANAGER.queueDownload("./img/map/doors.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/hud/Crosshair.png");
ASSET_MANAGER.queueDownload("./img/enemies/Bat.png");
ASSET_MANAGER.queueDownload("./img/enemies/PuddleJumper.png");
ASSET_MANAGER.queueDownload("./img/enemies/PuddleDeath.png");
ASSET_MANAGER.queueDownload("./img/enemies/SkeletonWalk.png");
ASSET_MANAGER.queueDownload("./img/enemies/SkeletonAttack.png");
ASSET_MANAGER.queueDownload("./img/enemies/SkeletonDeath.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Fireball.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BallPulseBlue.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BallPulseRed.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BallPulseGreen.png");
ASSET_MANAGER.queueDownload("./img/projectiles/PureSlash.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerSpecialMoveAllDirections.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/hud/ControllerTutorial.png");
ASSET_MANAGER.queueDownload("./img/hud/menucursor.png");
ASSET_MANAGER.queueDownload("./img/hud/heart.png");

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext('2d');
    let camera = new Camera(ctx);
    let level = new Level("20x20y0w0fWWWWWWWWWWWWWWWWWWWWSFFFFFFFFWWWWFFFWWWWWWFFFWWWFWWWWFFWWWWWWWWWWWWWFWWWWWFWWWWWWWWWWWWWFWWWWWFWWWWWWWWWFFFFFFFFFWFWWFWWWWWWFWWWWWWWFWFWWFWWWWWWFWFWFWFWFWFFFFWWWWWWFWWFWFWWFWFWWFWWWWWWFWFWFWFWFWFWWFWWWFFFFWWWWWWWFWFWWFFWWFWWFFFFFFFFFWFWWWWWWFWWWWWWWWWWWWFWWWWWWFFFFFFWWWWWFFFWWWWWWWWFFFFWWWWWFWWWWWWWWWWFFFFWWFFFFFWWWWWWWWFFFFWWWFWWWFWWFHFWWWWFFFFWWVWWWVWWFWFWWWWWFFFFFFFFFFFFFFFEWWWWWWWWWWWWWWWWWWWW");
    let gameEngine = new GameEngine(camera, level);
    gameEngine.addEntity(camera, "hud");
    gameEngine.AM = ASSET_MANAGER;
    //new MainCharacter(gameEngine);
    
    new WallHUD(gameEngine);
	
    new Floor(gameEngine);
    new Wall(gameEngine);
	
    let spawnList = [Bat.prototype, PuddleJumper.prototype, Skeleton.prototype];
    new Spawner(gameEngine, 300, 100, 3, spawnList); // game, x, y, delay, spawnList

    let charClasses = [new Lancer(), new BlackMage()];

    for (var i = 0; i < charClasses.length; i++) {
        gameEngine.addEntity(new NPC(gameEngine, charClasses[i]), "main");
    }
    new Crosshair(gameEngine);
    gameEngine.init(ctx);
    gameEngine.start();
});
