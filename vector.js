// returns the length of a vector
function lengthV(vector) {
    let length = vector.x * vector.x + vector.y * vector.y;
    if (length === 0) {
        return 0;
    }
    return Math.sqrt(length);
}

// Returns a vector with a length of 1.
function normalizeV(vector) {
    let length = lengthV(vector);
    if (length === 0) {
        return {x: 0, y: 0};
    }
    return {x: vector.x / length, y: vector.y / length};
}

// Scale a vector by a float
function scaleV(vector, s) {
    return {x: vector.x * s, y: vector.y * s};
}

// pt B - pt A
function dirV(A, B) {
    return {x: B.x - A.x, y: B.y - A.y};
}

// Get a normalized perpendicular vector
function perpendicularV(vector) {
    return normalizeV({x: vector.y, y: -vector.x});
}

function dirToVector(dir) {
    switch (dir) {
        case DIRECTION_UP:
            return {x: 0, y: 1};
        case DIRECTION_LEFT:
            return {x: -1, y: 0};
        case DIRECTION_DOWN:
            return {x: 0, y: -1};
        case DIRECTION_RIGHT:
            return {x: 1, y: 0};
        default:
            throw "Direction is invalid!";
    }
}

function vectorToDir(vector) {
	if (vector.x === 0 && vector.y === 0) {
		throw "Vector is (0,0)"
	}

    if (Math.abs(vector.y) > Math.abs(vector.x)) {
    	if (vector.y > 0) {
    		return DIRECTION_DOWN;
		} else {
    		return DIRECTION_UP
		}
    } else {
    	if (vector.x > 0) {
    		return DIRECTION_RIGHT;
		} else {
    		return DIRECTION_LEFT;
		}
	}
}

// Returns an object with an x and y component
function vector(X, Y)
{
	return {x: X, y: Y};
}