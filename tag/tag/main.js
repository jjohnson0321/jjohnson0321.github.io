class Fishy
{
  constructor(game, x, y, dir, speed, radius, color, distance, similar)
  {
    this.game = game;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.distance = distance;
    this.similar = similar;
    //flags
    this.escaping = false;
    //timers
    this.colorTimer = null;
    this.escapeTimer = null;
    let that = this;
    //this.changeDirTimer = new TimerCallback(this.game, RandomBetween(10, 30), true, function() {that.dir = RandomBetween(-Math.PI, Math.PI);});
  }
  
  screenWrap()
  {
    if(this.x < 0)
    {
      this.x = 1600;
    }
    if(this.y < 0)
    {
      this.y = 800;
    }
    if(this.x > 1600)
    {
      this.x = 0;
    }
    if(this.y > 800)
    {
      this.y = 0;
    }
  }
  
  // I don't want the fish to eat anymore
  
  /*Eat() // keep your distance
  {
    let distance = 10;
    for(let i = 0; i < this.game.entities.length; i++)
    {
      if(this.removeFromWorld === true)
      {
        break;
      }
      let temp = this.game.entities[i];
      if(this !== temp && temp.removeFromWorld !== true)
      {
        let A = {x: this.x, y: this.y, radius: this.radius};
        if(circleToCircle(A, temp))
        {
          if(this.radius > temp.radius)
          {
            this.radius += temp.radius;
            this.checkSize();
            this.setColor();
            temp.destroy();
          }
          else
          {
            temp.radius += this.radius;
            temp.checkSize();
            temp.setColor();
            this.destroy();
          }
        }
      }
    }
    
  }
  
  setColor()
  {
    if(this.colorTimer !== null)
    {
      this.colorTimer.destroy();
    }
    let that = this;
    this.colorTimer = new TimerCallback(this.game, 0.5, false, function() {that.color = that.nextColor;});
    this.currentColor = new Color(this.color.h, this.color.s, this.color.l);
    this.nextColor = new Color(360 - (this.radius - this.game.minSize) / (this.game.maxSize - this.game.minSize) * 360, this.color.s, this.color.l);
  }
  
  updateColor()
  {
    if(this.colorTimer !== null)
    {
      this.color = MixColor(this.currentColor, this.nextColor, this.colorTimer.getPercent());
    }
    if(this.color.h < 0)
    {
      console.log(this.radius);
    }
  }
  
  checkSize()
  {
    if(this.radius >= this.game.maxSize - this.game.minSize)
    {
      this.destroy();
      let numFish = 360;
      for(let i = 0; i < numFish; i++)
      {
        let color = new Color(330 - 360/10, 100, 50);
        let fishy = new Fishy(this.game, this.x, this.y, i * 2 * Math.PI / 360, 10, this.radius/numFish, color);
        fishy.quickUpdate(this.radius);
        this.game.addEntity(fishy);
      }
    } 
  }
  
  quickUpdate(radius)
  {
    let dt = this.game.clockTick;
    //let circle = Math.atan2(this.dir.y, this.dir.x);
    let dir = normalizeV({x: Math.cos(this.dir), y: Math.sin(this.dir)});
    this.x +=  dir.x * radius;
    this.y +=  dir.y * radius;
  }*/
  
  Rule1() // Seperation
  {
    for(let i = 0; i < this.game.entities.length; i++)
    {
      if(this.removeFromWorld === true)
      {
        break;
      }
      let temp = this.game.entities[i];
      if(this !== temp && temp.removeFromWorld !== true)
      {
        for(let j = 0; j < this.game.edgeCases.length; j++)
        {
          let A = {x: this.x + this.game.edgeCases[j].x, y: this.y + this.game.edgeCases[j].y, radius: this.radius * this.distance / 10};
          if(circleToCircle(A, temp))
          {
            if(this.radius * this.similar < temp.radius) // smaller size 
            {
              let dir = normalizeV(dirV(temp, A)); // direction away from the bigger fish
              dir = Math.atan2(dir.y, dir.x);
              let dir2 = temp.dir + Math.PI/2;
              let dir3 = temp.dir - Math.PI/2;
              
              if(Math.abs((dir + Math.PI) - (dir2 + Math.PI)) > Math.abs((dir + Math.PI) - (dir3 + Math.PI)) )
              {
                dir2 = dir3;
              }
              
              dir = mix(dir, dir2, 0.6);
              this.dir = mix(this.dir, dir, 0.2);

              let that = this;
              if(this.escapeTimer !== null)
              {
                this.escapeTimer.destroy();
                this.escapeTimer.pause();
              }
              else
              {
                if(this.escaping === false)
                {
                  this.escaping = true;
                }
              }
              this.escapeTimer = new TimerCallback(this.game, 1, false, function () {if(that.escaping === true) {that.escaping = false;} that.escapeTimer = null;});
            }
            else if(this.radius > temp.radius * temp.similar)// bigger size
            {

            }
            else // similar size
            {
              let dir = normalizeV(dirV(temp, A)); // direction away from the bigger fish
              dir = Math.atan2(dir.y, dir.x);
              let dir2 = temp.dir + Math.PI/2;
              let dir3 = temp.dir - Math.PI/2;
              
              if(Math.abs((dir + Math.PI) - (dir2 + Math.PI)) > Math.abs((dir + Math.PI) - (dir3 + Math.PI)) )
              {
                dir2 = dir3;
              }
              
              dir = mix(dir, dir2, 0.3);
              this.dir = mix(this.dir, dir, 0.05);
            }
          }
        }
      }
    }
  }
  
  Rule2() // Alignment
  {
    let dir = 0;
    let speed = 0;
    speed += this.speed;
    let count = 0;
    for(let i = 0; i < this.game.entities.length; i++)
    {
      if(this.removeFromWorld === true)
      {
        break;
      }
      let temp = this.game.entities[i];
      if(this !== temp && temp.removeFromWorld !== true)
      {
        for(let j = 0; j < this.game.edgeCases.length; j++)
        {
          let A = {x: this.x + this.game.edgeCases[j].x, y: this.y + this.game.edgeCases[j].y, radius: this.radius * this.distance};
          if(circleToCircle(A, temp))
          {
            if(this.radius * this.similar > temp.radius && this.radius < temp.radius * temp.similar) // similar size 
            {
              dir += temp.dir;
              speed += temp.speed;
              count++;
            }
          }
        }
      }
    }
    if(count > 0)
    {
      this.dir = mix(this.dir, dir/(count), 0.001);
      this.speed = mix(this.speed, speed/(count+1), 0.001);
    }
  }
  
  Rule3() // Cohesion
  {
    let positions = {x: this.x, y: this.y};
    let count = 1;
    for(let i = 0; i < this.game.entities.length; i++)
    {
      if(this.removeFromWorld === true)
      {
        break;
      }
      let temp = this.game.entities[i];
      if(this !== temp && temp.removeFromWorld !== true)
      {
        for(let j = 0; j < this.game.edgeCases.length; j++)
        {
          let A = {x: this.x + this.game.edgeCases[j].x, y: this.y + this.game.edgeCases[j].y, radius: this.radius * this.distance * 0.5};
          if(circleToCircle(A, temp))
          {
            if(this.radius * this.similar > temp.radius && this.radius < temp.radius * temp.similar) // similar size 
            {
              positions.x += temp.x - this.game.edgeCases[j].x;
              positions.y += temp.y - this.game.edgeCases[j].y;
              count++;
            }
          }
        }
      }
    }
    if(count > 1)
    {
      positions.x /= count;
      positions.y /= count;
      let dir = normalizeV(dirV(this, positions));
      this.dir = mix(this.dir, Math.atan2(dir.y, dir.x), 0.01);
    }
  }
  
  update()
  {
    let dt = this.game.clockTick;
    //let circle = Math.atan2(this.dir.y, this.dir.x);
    let dir = normalizeV({x: Math.cos(this.dir), y: Math.sin(this.dir)});
    let speed = this.speed;
    if(this.escaping)
    {
      speed *= 2;
    }
    this.x += dt * dir.x * speed;
    this.y += dt * dir.y * speed;
    //this.Eat();
    //this.updateColor();
    
    this.Rule1();
    this.Rule2();
    this.Rule3();
    this.screenWrap();
  }
  
  draw(ctx)
  {
    let dir = normalizeV({x: Math.cos(this.dir), y: Math.sin(this.dir)});
    let perpUp = normalizeV({x: Math.cos(this.dir + Math.PI/2), y: Math.sin(this.dir + Math.PI/2)});
    let perpDown = normalizeV({x: Math.cos(this.dir - Math.PI/2), y: Math.sin(this.dir - Math.PI/2)});
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius, this.y + dir.y * this.radius);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2, this.y - dir.y * this.radius + perpUp.y * this.radius/2);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2, this.y - dir.y * this.radius + perpDown.y * this.radius/2);
    ctx.fill();
    ctx.closePath();
    
    //Left and Right
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius + 1600, this.y + dir.y * this.radius);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2 + 1600, this.y - dir.y * this.radius + perpUp.y * this.radius/2);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2 + 1600, this.y - dir.y * this.radius + perpDown.y * this.radius/2);
    ctx.fill();
    ctx.closePath();    
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius - 1600, this.y + dir.y * this.radius);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2 - 1600, this.y - dir.y * this.radius + perpUp.y * this.radius/2);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2 - 1600, this.y - dir.y * this.radius + perpDown.y * this.radius/2);
    ctx.fill();
    ctx.closePath();    
    
    //Up and Down
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius, this.y + dir.y * this.radius + 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2, this.y - dir.y * this.radius + perpUp.y * this.radius/2 + 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2, this.y - dir.y * this.radius + perpDown.y * this.radius/2 + 1600);
    ctx.fill();
    ctx.closePath();    
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius, this.y + dir.y * this.radius - 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2, this.y - dir.y * this.radius + perpUp.y * this.radius/2 - 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2, this.y - dir.y * this.radius + perpDown.y * this.radius/2 - 1600);
    ctx.fill();
    ctx.closePath();    
    
    //Corners
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius + 1600, this.y + dir.y * this.radius + 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2 + 1600, this.y - dir.y * this.radius + perpUp.y * this.radius/2 + 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2 + 1600, this.y - dir.y * this.radius + perpDown.y * this.radius/2 + 1600);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius + 1600, this.y + dir.y * this.radius - 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2 + 1600, this.y - dir.y * this.radius + perpUp.y * this.radius/2 - 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2 + 1600, this.y - dir.y * this.radius + perpDown.y * this.radius/2 - 1600);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius - 1600, this.y + dir.y * this.radius + 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2 - 1600, this.y - dir.y * this.radius + perpUp.y * this.radius/2 + 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2 - 1600, this.y - dir.y * this.radius + perpDown.y * this.radius/2 + 1600);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.moveTo(this.x + dir.x * this.radius - 1600, this.y + dir.y * this.radius - 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpUp.x * this.radius/2 - 1600, this.y - dir.y * this.radius + perpUp.y * this.radius/2 - 1600);
    ctx.lineTo(this.x - dir.x * this.radius + perpDown.x * this.radius/2 - 1600, this.y - dir.y * this.radius + perpDown.y * this.radius/2 - 1600);
    ctx.fill();
    ctx.closePath();
    
   /*
    
    //Original
    ctx.beginPath();
    ctx.fillStyle = this.color.getColor();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    
    //Left and Right
    ctx.beginPath();
    ctx.arc(this.x + 800, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();    
    ctx.beginPath();
    ctx.arc(this.x - 800, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    
    //Up and Down
    ctx.beginPath();
    ctx.arc(this.x, this.y + 800, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();    
    ctx.beginPath();
    ctx.arc(this.x, this.y - 800, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    
    // Opposite Corners
    ctx.beginPath();
    ctx.arc(this.x + 800, this.y + 800, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();    
    ctx.beginPath();
    ctx.arc(this.x + 800, this.y - 800, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.x - 800, this.y + 800, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();    
    ctx.beginPath();
    ctx.arc(this.x - 800, this.y - 800, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    */
  }
  
  destroy()
  {
    if(this.colorTimer !== null)
    {
      this.colorTimer.destroy();
    }
    this.colorTimer = null;
    this.removeFromWorld = true;
  }
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    var fishy = null;
    //gameEngine.maxSize = 200;
    //gameEngine.maxRandomSize = 20;
    for (var i = 0; i < 240; i++) {
        let randX = RandomBetween(0, 1600);
        let randY = RandomBetween(0, 800);
        let randDir = RandomBetween(-Math.PI, Math.PI); // 0 is right
        let randSpeed = RandomBetween(30, 120);
        //let maxSize = gameEngine.maxRandomSize;
        let maxSize = gameEngine.maxSize;
        let minSize = gameEngine.minSize;
        let distance = 10;
        let similar = 1.1;
        let randomPercent = RandomBetween(0, 100);
        if(randomPercent < 37)
        {
          minSize = 1;
          maxSize = 3;
          distance = 25;
          similar = 2.5;
        }
        if(randomPercent < 66)
        {
          minSize = 3;
          maxSize = 6;
          distance = 20;
          similar = 1.75;
        }
        else if(randomPercent < 94)
        {
          minSize = 7;
          maxSize = 12;
          distance = 15;
          similar = 1.5;
        }
        else if(randomPercent < 98)
        {
          minSize = 11;
          maxSize = 17;
          distance = 10;
          similar = 1.2;
        }
        else if(randomPercent < 100)
        {
          minSize = 19;
          maxSize = 27;
          distance = 5;
          similar = 1.1;
        }
        let randRadius = RandomBetween(minSize, maxSize);
        let randColor = new Color(300 - randRadius / 25 * 360, RandomBetween(90, 100), RandomBetween(47, 53));
        fishy = new Fishy(gameEngine, randX, randY, randDir, randSpeed, randRadius, randColor, distance, similar);
        gameEngine.addEntity(fishy);
    }
    gameEngine.init(ctx);
    gameEngine.start();
    
  /*  
    var socket = io.connect("http://localhost:8888");

    window.onload = function () {
        console.log("starting up da sheild");
        var messages = [];
        var field = document.getElementById("field");
        var username = document.getElementById("username");

        socket.on("ping", function (ping) {
            console.log(ping);
            socket.emit("pong");
        });

        socket.on('sync', function (data) {
            console.log(data.length +" messages synced.");
            messages = data;
            var html = '';
            for (var i = 0; i < messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        });

        socket.on('message', function (data) {
            if (data.message) {
                messages.push(data);
                // update html
                var html = '';
                for (var i = 0; i < messages.length; i++) {
                    html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                    html += messages[i].message + '<br />';
                }
                content.innerHTML = html;
                content.scrollTop = content.scrollHeight;
            } else {
                console.log("There is a problem:", data);
            }
        });

        field.onkeydown = function (e) {
            if (e.keyCode == 13) {
                var text = field.value;
                var name = username.value;
                socket.emit('send', { message: text, username: name });
                field.value = "";
            }
        };

        socket.on("connect", function () {
            console.log("Socket connected.")
        });
        socket.on("disconnect", function () {
            console.log("Socket disconnected.")
        });
        socket.on("reconnect", function () {
            console.log("Socket reconnected.")
        });

  };*/

});
