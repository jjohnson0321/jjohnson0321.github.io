function Input() {
// MOUSE
	let that = this;
	
    this._ctx.canvas.addEventListener("mousedown", function (e) {
        that.clicking = true;
        that.click = true;
        if(e.button === 2)
        {
          that.rightClick = true;
        }
        //We ought to change to the attack animation if mouse was clicked
        that.change = true;
    }, false);
	
	this._ctx.canvas.addEventListener("mouseup", function (e) {
		that.clicking = false;
    }, false);

	//Right Click TODO make this do the special attack
    this._ctx.canvas.addEventListener("contextmenu", function (e) {
		e.preventDefault();
    }, false);

	//Update  mouse Position
    this._ctx.canvas.addEventListener("mousemove", function (e) {
		

		var element = that._ctx.canvas, offsetX = 0, offsetY = 0, mx, my;

		// Compute the total offset, subtracts the space between the canvas and the page.
		if (element.offsetParent !== undefined) {

				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
		}

		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;
		
        that.mouseX = mx;
		that.mouseY = my;
		that.mousePos = {x: mx, y: my};

    }, false);

    this._ctx.canvas.addEventListener("mousewheel", function (e) {

    }, false);

// KEYBOARD
    this._ctx.canvas.addEventListener("keydown", function (e) {
		//Key press counts each key once until it is released.
		
		if(that.chars[e.code] !== true)
		{
			//opposite directions are set to false, but will be set to true on release if they are still held down.
			if (e.code === "KeyW" || e.code === "ArrowUp")
			{
				that.w = true;
				that.s = false;
			}
			if (e.code === "KeyA" || e.code === "ArrowLeft")
			{
				that.a = true;
				that.d = false;
			}
			if (e.code === "KeyS" || e.code === "ArrowDown")
			{
				that.s = true;
				that.w = false;
			}
			if (e.code === "KeyD" || e.code === "ArrowRight")
			{
				that.d = true;
				that.a = false;
			}

			if (e.code === "Space") {
				that.spacebar = true;
			}

			if (e.code === "KeyL") {
				that.l = true;
				if (that.player) {
					that.player.takeDmg(1, {x: 0, y: 1});
				}
			}

			// Temporary
			if (e.code === "KeyP") {
        that.player.x += 10000;
        that.sceneManager.levelComplete();
			}
			// Temporary
			if (e.code === "Equal") {
        if(!that.equals)
        {
          that.audioManager.masterVolume += 10;
          if(that.audioManager.masterVolume > 100)
          {
            that.audioManager.masterVolume = 100;
          }
          that.equals = true;
        }

			}
			// Temporary
			if (e.code === "Minus") {
        if(!that.minus)
        {
          that.audioManager.masterVolume -= 10;
          if(that.audioManager.masterVolume < 0)
          {
            that.audioManager.masterVolume = 0;
          }
          that.minus = true;
        }
			}
			
			that.chars[e.code] = true;
			that.keyStack.push(e.code); // keystack tracks the order keys are pressed
			that.lastKey = e.code;		// This is the last input
		}

    }, false);

    this._ctx.canvas.addEventListener("keyup", function (e) {

		//Set opposites back to true if they are still held down on release.
		if (e.code === "KeyW" || e.code === "ArrowUp")
		{
			if(that.chars["KeyW"] !== true || that.chars["ArrowUp"] !== true) // that.chars is set to false after this check so || is ok
			{
				that.w = false;
				if(that.chars["KeyS"] === true || that.chars["ArrowDown"] === true)
				{
					that.s = true;
				}
			}
		}
		if (e.code === "KeyA" || e.code === "ArrowLeft")
		{
			if(that.chars["KeyA"] !== true || that.chars["ArrowLeft"] !== true)
			{
				that.a = false;
				if(that.chars["KeyD"] === true || that.chars["ArrowRight"] === true)
				{
					that.d = true;
				}
			}
		}
		if (e.code === "KeyS" || e.code === "ArrowDown")
		{
			if(that.chars["KeyS"] !== true || that.chars["ArrowDown"] !== true)
			{
				that.s = false;
				if(that.chars["KeyW"] === true || that.chars["ArrowUp"] === true)
				{
					that.w = true;
				}
			}
		}
		if (e.code === "KeyD" || e.code === "ArrowRight")
		{
			if(that.chars["KeyD"] !== true || that.chars["ArrowRight"] !== true)
			{
				that.d = false;
				if(that.chars["KeyA"] === true || that.chars["ArrowLeft"] === true)
				{
					that.a = true;
				}
			}
		}

		if (e.code === "Space") {
			that.spacebar = false;
		}

		if (e.code === "KeyL") {
			that.l = false;
		}
    
        // Temporary
    if (e.code === "Equal") {
        that.equals = false;
        console.log(that.audioManager.masterVolume);
        that.audioManager.setMasterVolume(that.audioManager.masterVolume);
    }
    // Temporary
    if (e.code === "Minus") {
        that.minus = false;
        console.log(that.audioManager.masterVolume);
        that.audioManager.setMasterVolume(that.audioManager.masterVolume);
    }


		that.chars[e.code] = false;
		// Step backwards through the stack to find the last key pressed that is still held down.
		if(that.lastKey === e.code)
		{
			that.keyStack.pop();
			while(that.keyStack.length > 0)
			{
				if(that.chars[that.keyStack[that.keyStack.length - 1]] === true)
				{
					that.lastKey = that.keyStack[that.keyStack.length - 1];
					break;
				}
				that.keyStack.pop();
			}
		}
    }, false);
}