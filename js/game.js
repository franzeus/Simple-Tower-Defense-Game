var Game = function() { 
	
	this.canvas;
	this.buffer;
	this.context;
	this.HEIGHT;
	this.WIDTH;
	this._canvasContext;
	this.FPS;
	this.interval = 0;

	this.vip = null;
	this.towers = [];
	this.enemies = [];
	
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
	$("#canvas").mousedown($.proxy(this.createTower, this));

	// Create VIP
	that.vip = new Vip(this._canvasContext, this.WIDTH, this.HEIGHT);

	// Create test tower
	this.towers.push(new Tower(this._canvasContext, 300, 120));

	this.FPS = 50;
	this.interval = setInterval(function() { that.draw() }, 1000 / this.FPS);
};

// Draw
Game.prototype.draw = function() {
	this.clearCanvas();

	// Draw VIP
	this.vip.draw();

	// Draw Towers
	this.towers.forEach(function(tower) {
		tower.draw();
	});

	this.context.drawImage(this.buffer, 0, 0);
};

//
Game.prototype.clearCanvas = function() {
	this._canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
};

//
Game.prototype.stop = function() {
    clearInterval(this.interval);    
    this.interval = 0; 
};

// Add new Tower to canvas
Game.prototype.createTower = function(e) {
	var x, y;
	
	if (e.pageX || e.pageY) { 
  	x = e.pageX; y = e.pageY;
	}	else { 
  	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	}	 
	
	// Check onClick Towers
	this.towers.forEach(function(tower) {
		//console.log(tower, tower.x, tower.y, tower.size);
		if(x >= tower.x && x <= (tower.x + tower.size) && y >= tower.y && y <= tower.y + tower.size)
			tower.clickEvent();
	});
}


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