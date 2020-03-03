class NPC extends Entity {
    constructor(game, characterClass, hp, hover = false) {
        super(game, characterClass.npc.x , characterClass.npc.y + (game.sceneManager.level.spawn.y * 96));
        this.characterClass = characterClass;
        this.hp = hp;
        this.animation = characterClass.animation.idleRight;
        this.animation.pause();
        let that = this;
        this.isIdling = false;
        this.idleTimer = new TimerCallback(game, 5, true, function () {
            that.idle();
        });
        this.radius = 25;
        this.hover = hover;
        if (this.hover) {
            this.game.addEntity(new HoverArrow(this.game, this.x, this.y - 24), LAYERS.HUD);
        }
    }

    setHover() {
        for (let i = 0; i < this.game.entities[LAYERS.MAIN].length; i++) {
            //set all other npcs' hover state to false
            if (this.game.entities[LAYERS.MAIN][i] instanceof NPC) {
                this.game.entities[LAYERS.MAIN][i].hover = false;
            }
        }
        //create a new one and set this entity as the privileged hover npc
        this.game.addEntity(new HoverArrow(this.game, this.x, this.y - 24), LAYERS.HUD);
        this.hover = true;
    }

    update() {
        /* If idle() has already been called and we are in the middle of
                playing the idle animation */
        if (this.game.game_state === GAME_STATES.CHANGING_LEVEL) {
            this.animation.unpause();
        } else if (this.isIdling) {

            //If the animation is finished, reset to single frame and reset idleTimer
            if (this.animation.isDone()) {
                this.isIdling = false;
                this.idleTimer.reset();
                this.animation.resetAnimation();
                this.animation.pause();
            } else {
                //Idle animation should be playing
                this.animation.unpause();
                this.idleTimer.pause();
            }
        } else {
            //Make sure we continue ticking idle timer so we can get there.
            this.idleTimer.unpause();
            this.animation.pause();
        }

        //If we click on a character while in the character select, choose it and start the playing state
        if (this.game.game_state === GAME_STATES.CHARACTER_SELECT) {

            let cursorCenter = this.game.camera.clickPosTranslation({
                x: this.game.mouseX,
                y: this.game.mouseY
            });


            if (pointToCircle(cursorCenter, this, this.radius)) {
                if (this.game.click) {
                    this.game.click = false;
                    this.game.switchToPlayMode(this);
                } else if (!this.hover){
                    let i = 0;
                    for (i = 0; i < this.game.entities[LAYERS.HUD].length; i++) {
                        //remove all other hover arrows
                        if (this.game.entities[LAYERS.HUD][i] instanceof HoverArrow) {
                            this.game.entities[LAYERS.HUD][i].destroy();
                        }
                    }
                    this.setHover();
                }
            }
            if (this.game.spacebar && this.hover) {
                this.game.switchToPlayMode(this);
            }
        }
    }

    idle() {
        this.animation.resetAnimation();
        this.animation.unpause();
        this.isIdling = true;
    }
	
	destroy()
	{
		super.destroy();
		this.idleTimer.destroy();
	}
}

function parseNPC(npcs) {
    list = npcs.split(' ');
    for (let i = 0; i < list.length; i++) {
        list[i] = new (eval(list[i]))();
    }
    return list;
}