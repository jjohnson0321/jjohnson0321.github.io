function Timer(game, time, looping)
{
	this.game = game;
	this.end = time;
	this.elapsed = 0.0;
	this.looping = looping;
	this.done = false;
	this.paused = false;
}

Timer.prototype.update = function (dt)
{
	if(this.paused === false)
	{
		console.log("Timer" + this.id + " Working: " + this.elapsed + " != " + this.end);
		this.elapsed += dt;
		if(this.elapsed >= this.end)
		{
			if(this.looping === true)
			{
				this.elapsed -= this.end;
			}
			else
			{
				this.destroy();
			}
		}
	}
}

Timer.prototype.getTime = function ()
{
	return this.elapsed;
}

Timer.prototype.getPercent = function ()
{
	return this.elapsed / this.end;
}

Timer.prototype.destroy = function ()
{
	console.log("I DIE NOW!");
	this.done = true;
}

Timer.prototype.pause = function ()
{
	this.paused = true;
}

Timer.prototype.unpause = function ()
{
	this.paused = false;
}

function TimerCallBack(game, time, looping, fn)
{
	Timer.call(this, game, time, looping);
	
	this.callback = fn;
}

TimerCallBack.prototype = new Timer();
TimerCallBack.prototype.constructor = TimerCallBack;

TimerCallBack.prototype.update = function (dt)
{
	if(this.paused === false)
	{
		this.elapsed += dt;
		if(this.elapsed >= this.end)
		{
			this.callback();
			if(this.looping === true)
			{
				this.elapsed -= this.end;
			}
			else
			{
				this.destroy();
			}
		}
	}
}