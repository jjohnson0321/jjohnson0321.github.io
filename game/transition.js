class Transition {
    constructor(game, npcList, pos, nextLevel) {
        this._game = game;
        game.addEntity(this, LAYERS.PRIORITY);
        game.game_state = GAME_STATES.CHANGING_LEVEL;
        this._npcList = npcList;
        this._charClassList = [];
        let that = this;
        npcList.forEach((npc) => {
            npc.animation = npc.characterClass.animation.walkingRight;
            this._charClassList.push(npc.characterClass);
        });
        npcList[0].x = pos.x;
        npcList[0].y = pos.y;
        this._x = pos.x;
        this._y = pos.y;
        this._nextLevel = nextLevel;
        this._phase = 0;
        this._progress = 0;
        this._finalPos = [];
    }

    draw(ctx) {
        this._npcList.forEach((npc) => {
            npc.draw(ctx);
        });
    }

    update() {
        if (this._phase === 0) {
            this._x += Math.ceil(150 * this._game._clockTick);
            this._game._camera._desiredZoom = (224 * 224);
            this._game._camera._desiredLoc.x = this._x;
            this._game._camera._desiredLoc.y = this._y;
            this._npcList[0].x = this._x + this._game._camera._x - this._game._camera._desiredLoc.x;
            if (this._game._camera.drawPosTranslation({x: this._game.sceneManager.level._width * 96, y: 0}, 1).x < 0) {
                this._phase = 1;
                for (let i = 1; i < this._npcList.length; i++) {
                    this._npcList[i].y = this._y;
                    this._npcList[i].x = this._game._camera.clickPosTranslation({x: 0, y: 0}).x - i * 32;
                }
            }
        } else if (this._phase === 1) {
            this._x += Math.ceil(150 * this._game._clockTick);
            this._game._camera.x = this._x;
            this._game._camera.y = this._y;

            for (let i = this._npcList.length - 1; i >= 0; i--) {
                let initPos;
                if (i === 0) {
                    initPos = this._x;
                } else {
                    initPos = this._game._camera.clickPosTranslation({x: 0, y: 0}).x - i * 32;
                }
                let desiPos;
                if (this._npcList.length % 2 === 0) {
                    this._npcList[i].y = this._y;
                    desiPos = this._x - 16;
                    let linePos = this._npcList.length / 2 - i;
                    desiPos += linePos * 32;
                } else {
                    this._npcList[i].y = this._y;
                    desiPos = this._x;
                    let linePos = Math.floor(this._npcList.length / 2) - i;
                    desiPos += linePos * 32;
                }
                this._npcList[i].x = initPos + (desiPos - initPos) * (this._progress / 4);
            }

            this._progress += this._game._clockTick;
            if (this._progress >= 4) {
                this._phase = 2;
                this._progress = 0;
            }
        } else if (this._phase === 2) {
            this._x += Math.ceil(150 * this._game._clockTick);
            this._game._camera.x = this._x;
            this._game._camera.y = this._y;
            for (let i = this._npcList.length - 1; i >= 0; i--) {
                if (this._npcList.length % 2 === 0) {
                    this._npcList[i].y = this._y;
                    this._npcList[i].x = this._x - 16;
                    let linePos = this._npcList.length / 2 - i;
                    this._npcList[i].x += linePos * 32;
                } else {
                    this._npcList[i].y = this._y;
                    this._npcList[i].x = this._x;
                    let linePos = Math.floor(this._npcList.length / 2) - i;
                    this._npcList[i].x += linePos * 32;
                }
            }
            this._progress += this._game._clockTick;
            if (this._progress >= 7) {
                this._phase = 3;
                this._progress = 0;
                if(this._nextLevel != null) {
					this._game.LoadLevel(this._nextLevel, this._charClassList, false);
				} else {
                    window.onbeforeunload= null;
                    window.location.href = "../credits.html";
				}
                this._y = this._game.sceneManager.level.spawn.y * 96;
                this._x = 0;
                while (0 <= this._x + (this._game._camera._width / 2)) {
                    this._x -= 5;
                }
                this._finalPos[0] = {orig: {x: this._x, y: this._y}, goal: {x: 0, y: this._game.sceneManager.level.spawn.y * 96}, zoom: this._game._camera._zoom};
                for (let i = this._npcList.length - 1; i >= 0; i--) {
                    if (this._npcList.length % 2 === 0) {
                        this._npcList[i].y = this._y;
                        this._npcList[i].x = this._x - 16;
                        let linePos = this._npcList.length / 2 - i;
                        this._npcList[i].x += linePos * 32;
                    } else {
                        this._npcList[i].y = this._y;
                        this._npcList[i].x = this._x;
                        let linePos = Math.floor(this._npcList.length / 2) - i;
                        this._npcList[i].x += linePos * 32;
                    }
                }
                for (let i = 0; i < this._npcList.length; i++) {
                    this._finalPos[i + 1] = {orig: {x: this._npcList[i].x, y: this._npcList[i].y},
                                goal: {x: this._npcList[i].characterClass.npc.x, y: this._npcList[i].characterClass.npc.y + indexToCoordinate(this._game.sceneManager.level._spawn.y) - 48}};
                }
                this._game._camera._x = this._x;
                this._game._camera._y = this._y;
            }

            /*if (this._progress === 250) {
                this._progress = 0;
				if(this._nextLevel != null) {
					this._game.LoadLevel(this._nextLevel, this._charClassList);
				} else {
					window.location.href = "../credits.html";
				}
                this._game._camera._desiredZoom = DEFAULT_ZOOM;
            }*/
        } else if (this._phase === 3) {
        
            let ease = smoothStopN(this._progress / 4, 2);
            this._game._camera.x = this._finalPos[0].orig.x + (this._finalPos[0].goal.x - this._finalPos[0].orig.x) * ease;
            this._game._camera.y = this._finalPos[0].orig.y + (this._finalPos[0].goal.y - this._finalPos[0].orig.y) * ease;
            this._game._camera.zoomCam(this._finalPos[0].zoom + (DEFAULT_ZOOM - this._finalPos[0].zoom) * smoothStartN(this._progress / 4, 2));
            for (let i = 0; i < this._npcList.length; i++) {
                this._npcList[i].x = Math.floor(this._finalPos[i + 1].orig.x + (this._finalPos[i + 1].goal.x - this._finalPos[i + 1].orig.x) * ease);
                this._npcList[i].y = Math.floor(this._finalPos[i + 1].orig.y + (this._finalPos[i + 1].goal.y - this._finalPos[i + 1].orig.y) * ease);
            }

            this._progress += this._game._clockTick;
            if (this._progress >= 4) {
                this._phase = null;
                this.destroy();
            }
        }
    }

    destroy() {
        this._game._camera.zoomCam(DEFAULT_ZOOM);
        this.removeFromWorld = true;
        let hover = true;
        this._game.addEntity(new ChooseYourFighter(this._game), LAYERS.HUD);
        for (var i = 0; i < this._charClassList.length; i++) {
            this._game.addEntity(new NPC(this._game, this._charClassList[i], this._charClassList[i].stats.maxHP, hover), LAYERS.MAIN);
            if (i === 0) {
                hover = false;
            }
        }
        this._game.switchToCharacterChooserMode(true); 
    }
}