class SpeedPotion extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        game.addEntity(this, LAYERS.PICKUPS);
        this.addScale = 1.5;
        this.scale = [STANDARD_DRAW_SCALE * this.addScale];
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/pickups/potions.png"), 32, 32, {x: 0, y: 0}, {x: 1, y: 0}, 7, true, this.scale);
        this.collider = new Collider(0, 0, 8, 8, 6, 6, 12, Infinity);
    }

    update() {
        if(this.game._player !== undefined)
        {
          this.scale[0] = STANDARD_DRAW_SCALE * this.addScale;
          if (checkCollision({x: this.x, y: this.y}, this.collider, {x: this.game._player.x, y: this.game._player.y}, this.game._player._collider)) {
              this.game.player.speed += 100;
              this.game._player.velocity.x = 0;
              this.game._player.velocity.y = 0;
              let that = this;
              new TimerCallback(this.game, 15, false, function ()
              { 
                that.game._player.velocity.x = 0;
                that.game._player.velocity.y = 0;
                that.game.player.speed -= 100;
              });
              this.destroy();
          }
        }
    }
}