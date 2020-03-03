class Collider {

    /**
     * @param {number} xCentOff The X offset for the center of the entity if it's
     *      center is not in the center of the frame.
     * @param {number} yCentOff The Y offset for the center of the entity if it's
     *      center is not in the center of the frame.
     * @param {number} upHit The distance above the center of the entity to make the
     *      top of the hit box.
     * @param {number} downHit The distance below the center of the entity to make
     *      the bottom of the hit box.
     * @param {number} leftHit The distance to the left of the center of the entity
     *      to make the left of the hit box.
     * @param {number} rightHit The distance to the right of the center of the
     *      entity to make the right of the hit box.
     * @param {number} radius The radius of the entity from its center. If
     *      radius is null then use hit box.
     * @param {number} weight The weight of the entity when collided with. The
     *      entity with less weight will move.
     */
    constructor(xCentOff, yCentOff, upHit, downHit, leftHit, rightHit, radius, weight) {
        this._xCentOff = xCentOff;
        this._yCentOff = yCentOff;
        this._upHit = upHit;
        this._downHit = downHit;
        this._leftHit = leftHit;
        this._rightHit = rightHit;
        this._radius = radius;
        this._weight = weight;
    }

    /**
     * @param {object} pos The {x: , y: } position of the entity.
     * @returns {object} The left, right, top and bottom of the hit box in an
     *      object. Values are accessed using the keys:
     *          left
     *          right
     *          top
     *          bottom
     */
    getHitBox(pos) {
        let posOff = {x: pos.x + this._xCentOff, y: pos.y + this._yCentOff};
        return {left: posOff.x - this._leftHit, right: posOff.x + this._rightHit, top: posOff.y - this._upHit, bottom: posOff.y + this._downHit}
    }

    /**
     * @param {object} pos The {x: , y: } position of the entity.
     * @returns {object} The radius of the entity along with x and y of the
     *      entity after offset. Values are accessed using the keys:
     *          radius
     *          x
     *          y
     */
    getRadius(pos) {
        return {radius: this._radius, x: pos.x + this._xCentOff, y: pos.y + this._yCentOff};
    }
}

/**
 * @param {object} box1 The object returned by the first entity's collider's
 *      getHitBox().
 * @param {object} box2 The object returned by the second entity's collider's
 *      getHitBox().
 * @returns {boolean} Returns true if the two hit boxes collided, false
 *      otherwise.
 */
function checkBoxCollision(box1, box2) {
    if (box1.right > box2.left && box1.left < box2.right
    && box1.bottom > box2.top && box1.top < box2.bottom) return true;
    return false;
}

/**
 * @param {object} rad1 The object returned by the first entity's collider's
 *      getRadius().
 * @param {object} rad2 The object returned by the second entity's collider's
 *      getRadius().
 * @returns {boolean} Returns true if the two radii collided, false otherwise.
 */
function checkRadiusCollision(rad1, rad2) {
    let xDist = Math.abs(rad1.x - rad2.x);
    let yDist = Math.abs(rad1.y - rad2.y)
    if (Math.sqrt(xDist * xDist + yDist * yDist) < rad1.radius + rad2.radius) return true;
    return false;
}

/**
 * @param {object} box The object returned by an entity's collider's
 *      getHitBox().
 * @param {object} rad The object returned by an entity's collider's
 *      getRadius().
 */
function checkBoxRadiusCollision(box, rad) {
    let closestBoxPoint;
    if (rad.x < box.left) {
        if (rad.y < box.top) {
            closestBoxPoint = {x: box.left, y: box.top};
        } else if (rad.y > box.bottom) {
            closestBoxPoint = {x: box.left, y: box.bottom};
        } else {
            closestBoxPoint = {x: box.left, y: rad.y};
        }
    } else if (rad.x > box.right) {
        if (rad.y < box.top) {
            closestBoxPoint = {x: box.right, y: box.top};
        } else if (rad.y > box.bottom) {
            closestBoxPoint = {x: box.right, y: box.bottom};
        } else {
            closestBoxPoint = {x: box.right, y: rad.y};
        }
    } else if (rad.y < box.top) {
        closestBoxPoint = {x: rad.x, y: box.top};
    } else if (rad.y > box.bottom) {
        closestBoxPoint = {x: rad.x, y: box.bottom};
    } else {
        return true;
    }
    return checkRadiusCollision(rad, {radius: 0, x: closestBoxPoint.x, y: closestBoxPoint.y});
}

/**
 * @param {object} pos1 The {x: , y: } position of the first entity.
 * @param {Collider} collider1 The first entity's collider.
 * @param {object} pos2 The {x: , y: } position of the second entity.
 * @param {Collider} collider2 The second entity's collider.
 * @returns {boolean} Returns true if there is a collision.
 */
function checkCollision(pos1, collider1, pos2, collider2) {
    if (collider1._radius && collider2._radius) {
        return checkRadiusCollision(collider1.getRadius(pos1), collider2.getRadius(pos2));
    } else if (collider1._radius || collider2._radius) {
        return checkBoxRadiusCollision(collider2.getHitBox(pos2), collider1.getRadius(pos1));
    } else {
        return checkBoxCollision(collider1.getHitBox(pos1), collider2.getHitBox(pos2));
    }
}

/**
 * @param {object} pos1 The {x: , y: } position of the first entity.
 * @param {Collider} collider1 The first entity's collider.
 * @param {object} pos2 The {x: , y: } position of the second entity.
 * @param {collider} collider2 The second entity's collider.
 * @returns {object} Returns the new positions for each entity formatted as:
 *      {pos1: {x: , y: }, pos2: {x: , y: }}
 */
function pushCollision(pos1, collider1, pos2, collider2) {
    let newPos1 = pos1;
    let newPos2 = pos2;
    while (checkCollision(pos1, collider1, pos2, collider2)) {
        let hb1 = collider2.getHitBox(newPos2);
        let hb2 = collider2.getHitBox(newPos2);
        if (collider1._weight < collider2._weight) {
            
            // Push entity1 away from entity2.
            if (collider2._radius) {
                let v1 = normalizeV(dirV(pos2, pos1));
                newPos1.x += v1.x;
                newPos1.y += v1.y;
            } else {
                let wallDist = [];
                wallDist.push(Math.abs(newPos1.x + collider1._rightHit - hb2.left));
                wallDist.push(Math.abs(newPos1.x - collider1._leftHit - hb2.right));
                wallDist.push(Math.abs(newPos1.y - collider1._downHit - hb2.bottom));
                wallDist.push(Math.abs(newPos1.y + collider1._upHit - hb2.top));

                let index = wallDist.indexOf(Math.min(...wallDist));
                if (index === 0) {
                    newPos1.x = hb2.left - Math.max(collider1._rightHit, collider1._radius);
                } else if (index === 1) {
                    newPos1.x = hb2.right + Math.max(collider1._leftHit, collider1._radius);
                } else if (index === 2) {
                    newPos1.y = hb2.bottom + Math.max(collider1._upHit, collider1._radius);
                } else {
                    newPos1.y = hb2.top - Math.max(collider1._downHit, collider1._radius);
                }
            }

        } else if (collider1._weight > collider2._weight) {

            // Push entity2 away from entity1.
            if (collider1._radius) {
                let v2 = normalizeV(dirV(pos1, pos2));
                newPos2.x += v2.x;
                newPos2.y += v2.y;
            } else {

                let wallDist = [];
                wallDist.push(Math.abs(newPos2.x + collider2._rightHit - hb1.left));
                wallDist.push(Math.abs(newPos2.x - collider2._leftHit - hb1.right));
                wallDist.push(Math.abs(newPos2.y - collider2._downHit - hb1.bottom));
                wallDist.push(Math.abs(newPos2.y + collider2._upHit - hb1.top));

                let index = wallDist.indexOf(Math.min(...wallDist));
                if (index === 0) {
                    newPos2.x = hb1.left - Math.max(collider2._rightHit, collider2._radius);
                } else if (index === 1) {
                    newPos2.x = hb1.right + Math.max(collider2._leftHit, collider2._radius);
                } else if (index === 2) {
                    newPos2.y = hb1.bottom + Math.max(collider2._upHit, collider2._radius);
                } else {
                    newPos2.y = hb1.top - Math.max(collider2._downHit, collider2._radius);
                }
            }

        } else {

            // Push both entities away from each other.
            let v1 = normalizeV(dirV(pos2, pos1));
            let v2 = normalizeV(dirV(pos1, pos2));
            newPos1.x += v1.x;
            newPos1.y += v1.y;
            newPos2.x += v2.x;
            newPos2.y += v2.y;
        }
    }
    return {pos1: newPos1, pos2: newPos2};
}