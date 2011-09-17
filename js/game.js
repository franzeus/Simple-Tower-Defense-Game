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
	$("#createTowerButton").click($.proxy(this.initAddTower, this));

	// Create VIP
	this.vip = new Vip(this._canvasContext, this.WIDTH, this.HEIGHT);
	//that.itemMenu = new ItemMenu(this._canvasContext, this.WIDTH, this.HEIGHT);
	// Create test tower
	this.towers.push(new Tower(this._canvasContext, 300, 120));
	this.towers.push(new Tower(this._canvasContext, 100, 420));	

	this.enemyShape = new Circle(this._canvasContext, 30, 30, 10, "#FF0000");

	this.FPS = 50;
	this.interval = setInterval(function() { that.draw() }, 1000 / this.FPS);
	this.spawnInterval = setInterval(function() { that.createEnemy() }, 1500);
};

// Draw
Game.prototype.draw = function() {
	this.clearCanvas();

	// Draw Menu
	//this.itemMenu.draw();
	
	// Draw VIP
	this.vip.draw();

	// Draw Towers
	this.towers.forEach(function(tower) {
		tower.draw();
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
}

//
Game.prototype.clearCanvas = function() {
	this.canvas.width = this.WIDTH; // Dont like this solution
	this._canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
};

//
Game.prototype.stop = function() {
    clearInterval(this.interval);    
    this.interval = 0;
};

// 
Game.prototype.checkCollision = function() {
	var vip = this.vip;
  this.enemies.forEach(function(enemy) {
		if(vip.x >= enemy.x && vip.x <= (enemy.x + enemy.size) && vip.y >= enemy.y && vip.y <= enemy.y + enemy.size)
			enemy.remove();
	});
};


// on canvas click event
Game.prototype.clickEvent = function(e) {
	
	var x = this.getMousePosition(e)[0];
	var y = this.getMousePosition(e)[1];
	
	// Check onClick Towers
	this.towers.forEach(function(tower) {
		if(x >= tower.x && x <= (tower.x + tower.size) && y >= tower.y && y <= tower.y + tower.size)
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

	this.enemies.push(new Enemy(this._canvasContext, randomX, randomY, this.vip.x, this.vip.y));
}

// ------------------------------------------------------
// Create Tower
Game.prototype.initAddTower = function(e) {
	this.drawNewTower = true;
	this.m = new Circle(this._canvasContext, e.pageX, e.pageY, 20, "#7F3300");
	$("#canvas").mousemove($.proxy(this.bindTowerToMouse, this));	
	$("#canvas").click($.proxy(this.createTower, this));
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
	$("#canvas").unbind("click", this.createTower);
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