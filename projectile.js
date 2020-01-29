/**
 * @author Joel Johnson, Gavin Montes, Gordon McCreary
 * Fires a projectile from an origin point along a vector.
 * @param game a reference to the game engine.
 * @param x the origin point's x value
 * @param y the origin point's y value
 * @param dir a VECTOR direction (not a UP,DOWN, LEFT, RIGHT direction)
 * @param speed, the speed the projectile will travel
 * @param lifetime, how long in ms before the projectile is destroyed.
 * @param owner, a reference to the player or enemy that fired the projectile.
 * @param animation, the projectile's animation.
 * @param dmg, the amount of damage the projectile does on hit.
 * @param radius, the radius of the projectile (used in collision)
 * @constructor
 */
class Projectile extends Entity
{
	constructor(game, x, y, dir, speed, lifetime, owner, animation, dmg, radius)
	{
		super(game, x, y);

		this.dir = dir;
		this.speed = speed;
		
		var that = this;
		new TimerCallBack(this.game, lifetime, false, function() {	that.destroy();	});
		
		this.ctx = game.ctx;
		this.owner = owner;
		
		this.animation = animation;
		this.animation.resetAnimation();
		
		this.dmg = dmg;
		this.radius = radius;
	}

	update() 
	{
		var that = this;
		if (this.owner instanceof Player) {
			//For each enemy
			this.game.entities[1].forEach(function(elem) {
				if (circleToCircle(that, elem)) {
					that.destroy();
					elem.destroy();
				}
			});
		}
		
		this.x += this.dir.x * this.game._clockTick * this.speed;
		this.y += this.dir.y * this.game._clockTick * this.speed;
	}
}
