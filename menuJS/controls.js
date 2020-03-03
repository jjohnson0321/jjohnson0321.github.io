const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/map/grounds.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/Ninja.png");
ASSET_MANAGER.queueDownload("./img/hud/Crosshair.png");
ASSET_MANAGER.queueDownload("./img/enemies/PuddleJumper.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Fireball.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Flame.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Shuriken.png");
ASSET_MANAGER.queueDownload("./img/projectiles/PureSlash.png");
ASSET_MANAGER.queueDownload("./img/projectiles/SpinToWin.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/NinjaDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerSpecialMoveAllDirections.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/projectiles/PokeSheet.png");
ASSET_MANAGER.queueDownload("./img/hud/Heart.png");
ASSET_MANAGER.queueDownload("./img/hud/ProgressBar.png");


ASSET_MANAGER.downloadAll(function () {
    let characters = [
        {name: 'lancer', class: new Lancer()},
        {name: 'black-mage', class: new BlackMage()},
        {name: 'ninja', class: new Ninja()}
    ];

    let canvases = [
        {type: '-base', callback: function(game) {

            }},
        {type: '-reg', callback: function(game) {
                new TimerCallback(game, 5, true, function () {
                    game.player.regularAttack();
                });
            }},
        {type: '-special', callback: function(game) {
                new TimerCallback(game, 5, true, function () {
                    game.player.specialAttack();
                });
            }}
    ];


    characters.forEach(function (character) {
        canvases.forEach(function (cvs) {
            // Base
            let canvas = document.getElementById(character.name + cvs.type);
            let ctx = canvas.getContext('2d');
            let camera = new Camera(ctx);

            let gameEngine = new GameEngine(camera);
            gameEngine.AM = ASSET_MANAGER;
            gameEngine.controlsPageInit(ctx);
            gameEngine.start();

            gameEngine.addEntity(new Player(gameEngine, character.class, character.class.stats.maxHP), LAYERS.MAIN);
            gameEngine.entities[LAYERS.HUD].forEach(function (elem) {
                if (elem instanceof Heart) {
                    elem.removeFromWorld = true;
                }
            });
            gameEngine.camera.x = gameEngine.player.x;
            gameEngine.camera.y = gameEngine.player.y;
            gameEngine.camera.zoomCam(20000);
            gameEngine.mouseX = 2000;
            gameEngine.mouseY = 16;
            cvs.callback(gameEngine);
        });
    });
});