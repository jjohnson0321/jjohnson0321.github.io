/*
Timer

The timer class is used to track the duration of certain functions.
Used for animations and timing
*/
class Timer
{
	constructor(game, time, looping) {
		this.game = game;
		this.end = time;
		this.elapsed = 0.0;
		this.looping = looping;
		this.removeFromWorld = false;
		this.paused = false;
		this.callback = null;
		
		this.game.addTimer(this);
	}

	update()
	{
		if (this.paused === false) {
			//console.log("Timer" + this.id + " Working: " + this.elapsed + " != " + this.end);
			this.elapsed += this.game.clockTick;
			if (this.elapsed >= this.end) {
				if (this.looping === true) {
          while(this.elapsed >= this.end && this.end > 0)
          {
            this.elapsed -= this.end;
          }
				} else {
					this.destroy();
				}
			}
		}
	}

	getTime() 
	{
		return this.elapsed;
	}

	getPercent() 
	{
		return this.elapsed / this.end;
	}

	destroy()
	{
		this.removeFromWorld = true;
	}

	pause() 
	{
		this.paused = true;
	}

	unpause() 
	{
		this.paused = false;
	}

	reset()
	{
		this.elapsed = 0;
	}
}

class TimerCallback extends Timer
{
	constructor(game, time, looping, fn)
	{
		super(game, time, looping);

		this.callback = fn;
	}

	update()
	{
		if (this.paused === false) {
			this.elapsed += this.game.clockTick;
			if (this.elapsed >= this.end) {
				if (this.looping === true) {
          while(this.elapsed >= this.end && this.end > 0)
          {
            this.elapsed -= this.end;
            this.callback();
          }
				} else {
          this.callback();
					this.destroy();
				}
			}
		}
	}
}