// Maximum time step to avoid big jumps.
const CLOCK_MAX_STEP = 0.05;

/*
Clock

The Clcok class is used to keep track of time.
This was original the timer class included in gameEngine
*/
class Clock {

    /*
    Default constructor.
    */
    constructor() {
        this._time = 0;
        this._maxStep = CLOCK_MAX_STEP;
        this._wallLastTimestamp = 0;
    }

    /*
    Updates the timer and returns the time delta. If the time delta is greater
    than CLOCK_MAX_STEP then CLOCK_MAX_STEP is returned.
    */
    tick() {
        let wallCurrent = Date.now();
        let wallDelta = (wallCurrent - this._wallLastTimestamp) / 1000;
        this._wallLastTimestamp = wallCurrent;

        let gameDelta = Math.min(wallDelta, this._maxStep);
        this._time += gameDelta;
        return gameDelta;
    }

    /*
    Returns the current time.
    */
    get time() {
        return this._time;
    }

    /*
    Changes the current time.

    time:
    The time that you want to be set.
    */
    set time(time) {
        this._time = time;
    }

    /*
    Resets the timer.
    */
    resetClock() {
        this._time = 0;
        this._maxStep = CLOCK_MAX_STEP;
        this._wallLastTimestamp = 0;
    }
}