class WallObject extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        this.game.level._walls.push({x: this.x, y: this.y});
    }
    
    draw() {}
    update() {}

    destroy() {
      if(this.game.removeFromWorld === false)
      {
        this.game.removeFromWorld = true;
        this.game.level._walls[this.x][this.y].pop();
      }
    }
    
    takeDamage(dmg, dir, knockBack)
    {
    }
}