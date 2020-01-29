class NPC extends Entity {
    constructor(game, characterClass) {
        super(game, characterClass.npc.x, characterClass.npc.y);
        this.characterClass = characterClass;
        this.animation = characterClass.animation.idleRight;
        this.animation.pause();
        let that = this;
        this.isIdling = false;
        this.idleTimer = new TimerCallBack(game, 5, true, function () {
            that.idle();
        });
        this.radius = 25;
    }

    update() {
        if (this.isIdling && this.animation.isDone()) {
            this.isIdling = false;
            this.animation.resetAnimation();
            this.animation.pause();
        }

        //If we click on a character while in the character select, choose it and start the playing state
        if (this.game.game_state === GAME_STATES.CHARACTER_SELECT) {

            if (this.game.click) {
                let cursorCenter = this.game.camera.clickPosTranslation({
                        x: this.game.mouseX,
                        y: this.game.mouseY
                });
                if (pointToCircle(cursorCenter, this, this.radius)) {
                    this.game.click = false;
                    this.game.game_state = GAME_STATES.PLAYING;
                    this.destroy();
                    new Player(this.game, this.characterClass);
                    this.game.addEntity(new Tutorial(this.game), "hud");
                }
            }
        }
    }

    idle() {
        this.animation.resetAnimation();
        this.animation.unpause();
        this.isIdling = true;
    }
}