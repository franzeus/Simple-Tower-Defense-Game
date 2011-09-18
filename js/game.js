var Game = function() { 
	
	this.canvas;
	this.buffer;
	this.context;
	this.HEIGHT;
	this.WIDTH;
	this._canvasContext = null;
	this.FPS;
	this.interval = 0;

	this.vip = null;
	this.towers = [];
	this.enemies = [];
	this.itemMenu = null;

	this.drawNewTower = false;
	this.m = null;
	
	this.start();
};

// Init canvas and the game
Game.prototype.start = function() {
	var that = this;

	this.canvas = document.getElementById("canvas");
	this.buffer = document.getElementById("buffer-canvas");

	this.buffer.width = this.canvas.width;
	this.buffer.height = this.canvas.height;

	this.context = this.canvas.getContext("2d");
	this._canvasContext = this.buffer.getContext("2d");

	this.HEIGHT = this.canvas.height;
	this.WIDTH = this.canvas.width;

	// Events
	$("#canvas").mousedown($.proxy(this.clickEvent, this));
	$(".createTowerButton").click($.proxy(this.initAddTower, this));

	// Create VIP
	this.vip = new Vip(this._canvasContext, this.WIDTH, this.HEIGHT);

	this.FPS = 50;
	this.interval = setInterval(function() { that.draw() }, 1000 / this.FPS);
	this.spawnInterval = setInterval(function() { that.createEnemy() }, 4000);
};

// Draw
Game.prototype.draw = function() {
	var that = this;
	this.clearCanvas();
	
	// Draw VIP
	this.vip.draw();

	// Draw Towers
	this.towers.forEach(function(tower) {
		tower.draw();
		// Bullets
		tower.bullets.forEach(function(bullet) {
			if( that.isColliding(bullet.bulletCollisionShape, tower.rangeCollisionShape) )								  
					bullet.draw();
			else
				console.log("outer");
		});
	});
	
	// Draw Enemies
	this.enemies.forEach(function(enemy) {
		enemy.draw();
	});

	// Update game
	this.update();

	if(this.drawNewTower)
		this.m.draw();

	this.context.drawImage(this.buffer, 0, 0);	
};

// Update Game
Game.prototype.update = function() {
	this.checkCollision();

	if(this.vip.lives <= 0)
		this.stop();
}

//
Game.prototype.clearCanvas = function() {
	this.canvas.width = this.WIDTH; // Dont like this solution
	this._canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
};

// Stop Game
Game.prototype.stop = function() {
    clearInterval(this.interval);    
    this.interval = 0;
};

//
Game.prototype.checkCollision = function() {
	var vip = this.vip;
	var towers = this.towers;
	var that = this;
  
  // Enemy collision detection
  this.enemies.forEach(function(enemy) {
  	if(enemy.isVisible) {
  		
  		// Collision with base
			if(that.isColliding(enemy.enemyShape, vip)) {
				enemy.remove(); // TODO: remove from enemies-array
				vip.setDamage();
			}

			// Tower
			towers.forEach(function(tower) {
				if(tower.lives>0) {

					// Collision with tower
					if(that.isColliding(enemy.enemyShape, tower.collisionShape)) {
						enemy.remove(); // TODO: remove from enemies-array
					 	tower.setDamage();
					}

					// Collision with tower range
					if(that.isColliding(enemy.enemyShape, tower.rangeCollisionShape))
						tower.shoot(enemy.enemyShape.x, enemy.enemyShape.y);
				}
			});
		}
	});
};


// on canvas click event
Game.prototype.clickEvent = function(e) {
	
	var x = this.getMousePosition(e)[0];
	var y = this.getMousePosition(e)[1];
	
	// Check onClick Towers
	this.towers.forEach(function(tower) {
		if(	x >= tower.collisionShape.x && 
				x <= (tower.collisionShape.x + tower.collisionShape.width) && 
				y >= tower.collisionShape.y &&
				y <= tower.collisionShape.y + tower.collisionShape.height)
			tower.clickEvent();
	});
}

// ------------------------------------------------------
// Create Enemy
Game.prototype.createEnemy = function() {
	
	var plusMinus = this.getRandomNumber(0,3);

	if(plusMinus == 0) {
		var randomX = this.getRandomNumber(0, this.WIDTH) - this.WIDTH;
		var randomY = this.getRandomNumber(0, this.HEIGHT) - this.HEIGHT;
	} else if(plusMinus == 1) {
		var randomX = this.getRandomNumber(0, this.WIDTH) + this.WIDTH;
		var randomY = this.getRandomNumber(0, this.HEIGHT) - this.HEIGHT;
	} else if(plusMinus == 2) {
		var randomX = this.getRandomNumber(0, this.WIDTH) - this.WIDTH;
		var randomY = this.getRandomNumber(0, this.HEIGHT) + this.HEIGHT;
	} else {
		var randomX = this.getRandomNumber(0, this.WIDTH) + this.WIDTH;
		var randomY = this.getRandomNumber(0, this.HEIGHT) + this.HEIGHT;
	}
	this.enemies.push(new Enemy(this._canvasContext, randomX, randomY, this.vip.x + (this.vip.width / 2), this.vip.y  + (this.vip.height / 2)));
}

// ------------------------------------------------------
// Create Tower
Game.prototype.initAddTower = function(e) {
	this.drawNewTower = true;
	this.m = new Circle(this._canvasContext, e.pageX, e.pageY, 20, 'rgba(17, 17, 17, 0.8)');
	$("#canvas").mousemove($.proxy(this.bindTowerToMouse, this));	
	$("#canvas").mousedown($.proxy(this.createTower, this));
};
Game.prototype.bindTowerToMouse = function(e) {	
	if(this.drawNewTower) {		
		this.m.x = e.pageX - 40;
		this.m.y = e.pageY - 40;		
	}
}
Game.prototype.createTower = function(e) {
	this.towers.push(new Tower(this._canvasContext, e.pageX - 40, e.pageY - 40));
	e.stopPropagation();
	this.drawNewTower = false;
	$("#canvas").unbind("mousemove", this.createTower);
	$("#canvas").unbind("mousedown", this.createTower);
};



// ------------------------------------------------------
// HELPERS

// Return a random number between min and max
Game.prototype.getRandomNumber = function( min, max ) {
	if( min > max )
		return( -1 );
	if( min == max )
		return( min );

	return( min + parseInt( Math.random() * ( max-min+1 ) ) );
};

// Returns current mouseposition
Game.prototype.getMousePosition = function(e) {
	var x, y;
	
	if (e.pageX || e.pageY) {
  	x = e.pageX; y = e.pageY;
	}	else { 
  	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	}
	return [x,y];
};

// Returns true if object1 is in object2 (Rectangle)
Game.prototype.isColliding = function(obj1, obj2) {
	if(	obj1.x > obj2.x &&
			obj1.x < (obj2.x + obj2.width) &&
			obj1.y > obj2.y &&
			obj1.y < ( obj2.y +  obj2.height) )	{
				return true;
			}
	return false;
}