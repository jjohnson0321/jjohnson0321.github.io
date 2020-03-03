class PCRemnant extends Entity {
    constructor(game, x, y, characterClass, animation) {
        super(game, x, y);
        this.characterClass = characterClass;
        this.animation = animation;
        this.animation.resetAnimation();
        this.animation.unpause();
        this.radius = STANDARD_ENTITY_RADIUS;
        game.addEntity(this, LAYERS.PICKUPS);
        console.log(animation._sheetWidth);
    }

    update() {
      if(this.game.player !== null)
      {
        if(this.animation.isDone()) {
            this.animation.setFrame(this.animation.getLastFrameAsInt());
            this.animation.pause();
        }
        if (circleToCircle(this, this.game.player)) {
            this.revive();
            this.destroy();
        }
      }
    }

    revive() {
        this.game.sceneManager.revived.push(this);
    }
}