function pointToPoint(A, B)
{
	if(A.x === B.x && A.y === B.y)
	{
		return true;
	}
	return false;
}

function pointToCircle(A, B, range)
{
	let dist = (B.y - A.y) * (B.y - A.y) + (B.x - A.x) * (B.x - A.x);
	dist = Math.sqrt(dist);
	
	if(dist <= range)
	{
		//console.log(A.x + ", " + A.y + "; " + B.x + ", " + B.y);
		//console.log("Dist: " + dist + ", Range: " + range);
		return true;
	}
	return false;
}

function circleToCircle(A, B)
{
	let dist = (B.y - A.y) * (B.y - A.y) + (B.x - A.x) * (B.x - A.x);
	dist = Math.sqrt(dist);
	
	if(dist <= A.radius + B.radius)
	{
		return true;
	}
	return false;
}

function squareToSquare(A, B)
{
	let halfW = (A.width + B.width) / 2;
	let halfH = (A.height + B.height) / 2;
	
	if(B.x <= A.x + halfW && B.x >= A.x - halfW)
	{
		if(B.y <= A.y + halfH && B.y >= A.y - halfH)
		{
			return true;
		}
	}
	return false;
}