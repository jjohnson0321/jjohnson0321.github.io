function normalizeV(X, Y)
{
	let length = X*X + Y*Y;
	length = math.sqrt(length);
	return {x: X/length, y: Y/length};
}

function scaleV({X, Y}, s)
{
	return {x: X*s, y: Y*s};
}