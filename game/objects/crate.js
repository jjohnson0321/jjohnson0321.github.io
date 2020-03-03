class Crate extends Object {
    constructor(game, x, y, spawner) {
        super(game, x, y, spawner);
        
        this.myAddScale = 3;
        this.myScale = [this.myAddScale * STANDARD_DRAW_SCALE];

        this.animation = new Animation(game.AM.getAsset("./img/objects/Crate.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 0, y: 0}, {x: 1, y: 0}, 10, true, this.myScale);
        this.deathAnimation = new Animation(game.AM.getAsset("./img/objects/Crate.png"),
            STANDARD_ENTITY_FRAME_WIDTH,
            STANDARD_ENTITY_FRAME_WIDTH,
            {x: 1, y: 0}, {x: 3, y: 0}, 7, false, this.myScale);

        this.animation = this.animation;
        this.animation.pause();
        this.animation.setFrame(0);
        
        this.collider = new Collider(0, 0, -13, 12, -15, 16, null, 150);
        this.radius = STANDARD_ENTITY_RADIUS - 5;
        this.inRange = false;
    }

    update() {
      this.myScale[0] = this.myAddScale * STANDARD_DRAW_SCALE;
    
      this.animation.pause();
      this.animation.setFrame(2 - Math.ceil(this.hp));
    }

}