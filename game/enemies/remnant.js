class Remnant extends Entity
{
  constructor(game, x, y, animation)
  {
    super(game, x ,y);
    this.animation = animation;
    this.myScale = this.animation._scale;
    this.animation._scale = this.myScale;
    this.myAddScale = this.myScale / STANDARD_DRAW_SCALE;
    this.game.addEntity(this, LAYERS.REMNANTS);
  }
  
  update = function ()
  {
    if(this.animation.isDone())
    {
      this.animation.pause();
      this.animation.setFrame(this.animation.getLastFrameAsInt());
      let that = this;
      this.update = function () {
        that.myScale[0] = STANDARD_DRAW_SCALE * that.myAddScale;
      }
    }
  }
}

class PuddleRemnant extends Entity
{
  constructor(game, x, y, animation)
  {
    super(game, x ,y);
    this.animation = animation;
    this.myScale = this.animation._scale;
    this.animation._scale = this.myScale;
    this.myAddScale = this.myScale / STANDARD_DRAW_SCALE;
    this.game.addEntity(this, LAYERS.PUDDLEREMNANTS);
  }
  
  update = function ()
  {
    if(this.animation.isDone())
    {
      this.animation.pause();
      this.animation.setFrame(this.animation.getLastFrameAsInt());
      let that = this;
      this.update = function () {
        that.myScale[0] = STANDARD_DRAW_SCALE * that.myAddScale;
      }
    }
  }
}