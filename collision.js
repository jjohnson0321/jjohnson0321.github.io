// if two points are equal they are collding
function pointToPoint(A, B) {
    return A.x === B.x && A.y === B.y;
}

//if the distance between a point and a circle is less than the radius of the circle they are colliding
function pointToCircle(A, B, range) {
    let dist = (B.y - A.y) * (B.y - A.y) + (B.x - A.x) * (B.x - A.x);
    dist = Math.sqrt(dist);

    return dist <= range;

}

// if two circles are closer than their combined radius they are colliding
function circleToCircle(A, B) {
    let dist = (B.y - A.y) * (B.y - A.y) + (B.x - A.x) * (B.x - A.x);
    dist = Math.sqrt(dist);

    return dist <= A.radius + B.radius;

}

//Make a big square the size of both squares combined with the center point of A.
//If B's center point lies within that square, these two squares collide.
function squareToSquare(A, B) {
    let halfW = (A.width + B.width) / 2;
    let halfH = (A.height + B.height) / 2;

    if (B.x <= A.x + halfW && B.x >= A.x - halfW) {
        if (B.y <= A.y + halfH && B.y >= A.y - halfH) {
            return true;
        }
    }
    return false;
}

function pointToSquare(A, B) {
    let halfW = (B.width) / 2;
    let halfH = (B.height) / 2;

    if (A.x <= B.x + halfW && A.x >= B.x - halfW) {
        if (A.y <= B.y + halfH && A.y >= B.y - halfH) {
            return true;
        }
    }
    return false;
}