function smoothStartN(t, n)
{
	return Math.pow(t, n);
}

function flip(t)
{
	return 1 - t;
}

function smoothStopN(t, n)
{
	flip(smoothStartN(flip(t), n));
}

// A and B can be anything.
// percentage is a ratio between 0.00 and 1.00
// mix (A, B, 0.1) would return a value that is 1 part A and 9 parts B
function mix(A, B, percentage)
{
	return A * (1-percentage) + B * percentage;
}

function scale(x, t)
{
	return x * t;
}

function reverseScale(x, t)
{
	return x * (1-t);
}

// note Arch returns values from 0 - 0.25 - 0. As t goes from 0 - 0.5 - 1
function arch(t)
{
	return t * flip(t);
}

function arch4(t)
{
	return t * flip(t) * 4;
}

function clampBottom(t)
{
	if(t < 0)
	{
		return 0;
	}
	return t;
}

function clampTop(t)
{
	if(t > 1)
	{
		return 1;
	}
	return t;
}

function clamp(t)
{
	return clampBottom(clampTop(t));
}

function bounceClampBottom(t)
{
	return Math.abs(t);
}

function bounceClampTop()
{
	return flip(Math.abs(flip(t)));
}

function bounceClamp(t)
{
	return BounceClampTop(BounceClampBottom(t));
}