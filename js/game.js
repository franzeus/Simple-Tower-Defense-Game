var Game = function() { 
	var that = this;
	this.canvas;
	this.buffer;
	this.context;
	this.HEIGHT;
	this.WIDTH;
	this._canvasContext;
	this.FPS;
	this.interval = 0;

	this.vip = null;
	this.tower = [];
	this.enemy = [];
	
	this.start();	
};

// Init canvas and the game
Game.prototype.start = function() {

	this.canvas = document.getElementById("canvas");
	this.buffer = document.getElementById("buffer-canvas");

	this.buffer.width = this.canvas.width;
	this.buffer.height = this.canvas.height;

	this.context = this.canvas.getContext("2d");
	this._canvasContext = this.buffer.getContext("2d");

	this.HEIGHT = this.canvas.height;
	this.WIDTH = this.canvas.width;		

	// Create VIP
	that.vip = new Vip(this._canvasContext, this.WIDTH, this.HEIGHT);

	this.FPS = 50;
	this.interval = setInterval(function() { that.draw() }, 1000 / this.FPS);
};

// Draw
Game.prototype.draw = function() {
	this.clear();
	//this.vip.draw();
};


// ------------------------------------------------------
// Return a random number between min and max
Game.prototype.getRandomNumber = function( min, max ) {
	if( min > max )
		return( -1 );
	if( min == max )
		return( min );

	return( min + parseInt( Math.random() * ( max-min+1 ) ) );
};

Game.prototype.clear = function() {
	this._canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
};

Game.prototype.stop = function() {
    clearInterval(this.interval);    
    this.interval = 0; 
};