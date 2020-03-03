if (sessionStorage.getItem('master_volume') === null
|| sessionStorage.getItem('music_volume') === null
|| sessionStorage.getItem('gameplay_volume') === null
|| sessionStorage.getItem('fps') === null
|| sessionStorage.getItem('level') === null
|| sessionStorage.getItem('npcs') === null) {
    window.location.href = '../index.html';
}

window.onbeforeunload = function() {
    //TODO open pause menu

    return "Leaving this page will reset the wizard";
};

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/map/grounds.png");
ASSET_MANAGER.queueDownload("./img/map/pit.png");
ASSET_MANAGER.queueDownload("./img/map/walls.png");
ASSET_MANAGER.queueDownload("./img/map/doors.png");
ASSET_MANAGER.queueDownload("./img/map/specialDoors.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/Ninja.png");
ASSET_MANAGER.queueDownload("./img/hud/Crosshair.png");
ASSET_MANAGER.queueDownload("./img/enemies/Bat.png");
ASSET_MANAGER.queueDownload("./img/enemies/GoldBat.png");
ASSET_MANAGER.queueDownload("./img/enemies/PuddleJumper.png");
ASSET_MANAGER.queueDownload("./img/enemies/PuddleDeath.png");
ASSET_MANAGER.queueDownload("./img/enemies/PuddleHopper.png");
ASSET_MANAGER.queueDownload("./img/enemies/HopperDeath.png");
ASSET_MANAGER.queueDownload("./img/enemies/SkeletonWalk.png");
ASSET_MANAGER.queueDownload("./img/enemies/SkeletonAttack.png");
ASSET_MANAGER.queueDownload("./img/enemies/SkeletonDeath.png");
ASSET_MANAGER.queueDownload("./img/enemies/BoneManWalk.png");
ASSET_MANAGER.queueDownload("./img/enemies/BoneManAttack.png");
ASSET_MANAGER.queueDownload("./img/enemies/BoneManDeath.png");
ASSET_MANAGER.queueDownload("./img/enemies/Turtle.png");
ASSET_MANAGER.queueDownload("./img/objects/Crate.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Arrows.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Peasants.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Egg.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Fireball.png");
ASSET_MANAGER.queueDownload("./img/projectiles/FireballExplodes.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Flame.png");
ASSET_MANAGER.queueDownload("./img/projectiles/Shuriken.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BallPulseBlue.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BallPulseRed.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BallPulseGreen.png");
ASSET_MANAGER.queueDownload("./img/projectiles/PureSlash.png");
ASSET_MANAGER.queueDownload("./img/projectiles/SpinToWin.png");
ASSET_MANAGER.queueDownload("./img/projectiles/BoneProjectile.png");
ASSET_MANAGER.queueDownload("./img/projectiles/AirSlash.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/BlackMageDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/NinjaDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerSideToSideSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerUpDownSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerSpecialMoveAllDirections.png");
ASSET_MANAGER.queueDownload("./img/player_characters/LancerDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/player_characters/King.png");
ASSET_MANAGER.queueDownload("./img/player_characters/KingDmgSheet.png");
ASSET_MANAGER.queueDownload("./img/hud/ControllerTutorial.png");
ASSET_MANAGER.queueDownload("./img/hud/HoverArrow.png");
ASSET_MANAGER.queueDownload("./img/hud/menucursor.png");
ASSET_MANAGER.queueDownload("./img/hud/Heart.png");
ASSET_MANAGER.queueDownload("./img/hud/ChangeDoorsWallsButtons.png");
ASSET_MANAGER.queueDownload("./img/hud/ChooseYourFighter.png");
ASSET_MANAGER.queueDownload("./img/hud/ProgressBar.png");
ASSET_MANAGER.queueDownload("./img/hud/HealthBar.png");
ASSET_MANAGER.queueDownload("./img/pickups/key.png");
ASSET_MANAGER.queueDownload("./img/pickups/specialKey.png");
ASSET_MANAGER.queueDownload("./img/pickups/potions.png");
ASSET_MANAGER.queueDownload("./img/projectiles/PokeSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/StoneGolemSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/MagmaGolemSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/SnekSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/SnakSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/SnukSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/CactusBoiSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/CactusMadmanSheet.png");
ASSET_MANAGER.queueDownload("./img/enemies/HedgeMonster.png");
ASSET_MANAGER.queueDownload("./img/enemies/HedgeMove.png");
ASSET_MANAGER.queueDownload("./img/enemies/HedgeMonsterToSleep.png");
ASSET_MANAGER.queueDownload("./img/projectiles/CactusSpine.png");
ASSET_MANAGER.queueDownload("./img/hud/GameOver.png");
ASSET_MANAGER.queueDownload("../menuImages/retry.png");
ASSET_MANAGER.queueDownload("../menuImages/retryhover.png");
ASSET_MANAGER.queueDownload("../menuImages/retrypress.png");
ASSET_MANAGER.queueDownload("../menuImages/restart.png");
ASSET_MANAGER.queueDownload("../menuImages/restarthover.png");
ASSET_MANAGER.queueDownload("../menuImages/restartpress.png");
ASSET_MANAGER.queueDownload("../menuImages/credits.png");
ASSET_MANAGER.queueDownload("../menuImages/creditshover.png");
ASSET_MANAGER.queueDownload("../menuImages/creditspress.png");
ASSET_MANAGER.queueDownload("../menuImages/main.png");
ASSET_MANAGER.queueDownload("../menuImages/mainhover.png");
ASSET_MANAGER.queueDownload("../menuImages/mainpress.png");

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext("2d");

    let gameEngine = new GameEngine(ctx);
    gameEngine.AM = ASSET_MANAGER;
    gameEngine.init();
    gameEngine.start();
    
    new Crate(gameEngine, 96 * 3, 96* 1.5);
    new ParticleEmitter(gameEngine, 96 * 3, 96 * 1.5,
    20,     // rate
    0, 90,   // dir
    1, 10,  // speed
    1, 4,   // lifeTime
    1, 1,   // size
    1, 1);  // color
    console.log("HEY");
});
