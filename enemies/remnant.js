class Remnant extends Entity
{
	constructor(game, x, y, animation)
  {
    super(game, x ,y);
    this.animation = animation;
    
    this.game.addEntity(this, "floor");
  }
  
  update = function ()
  {

    if(this.animation.isDone())
    {
      this.animation.pause();
      this.animation.setFrame(this.animation.getLastFrameAsInt());

      this.update = function () {};
      console.log(this.animation.getLastFrameAsInt());
    }
  }
}