class Object extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.game.addEntity(this, LAYERS.OBJECTS);
        let that = this;
        this.hp = 2;
		
        this.weight = 2;
    }

    destroy() {
        new Remnant(this.game, this.x, this.y, this.deathAnimation);
        
        let random = Math.random()*100;
        if(random <= 0.5)
        {
          new StarPotion(this.game, this.x, this.y);
        }
        else if(random <= 1)
        {
          new HealthPotion(this.game, this.x, this.y);
        }
        else if(random <= 2)
        {
          new SpeedPotion(this.game, this.x, this.y);
        }
        
        super.destroy();
    }
    
    takeDamage(dmg, dir, knockBack)
    {
			this.x += dir.x * knockBack * 1/this.weight;
			this.y += dir.y * knockBack * 1/this.weight;
			this.hp -= dmg;
			if (this.hp <= 0) {
				this.destroy();
			}
    }
}