Tower = function(_context, _posX, _posY) { 

	this.canvasContext = _context;

	this.id = 1;
	this.x = _posX;
	this.y = _posY;
	
	this.radius = 20;
	this.size = 30;
	this.range = 80;
	this.shootsPerSeconds = 15;
	this.costs = 100;
	this.color = "#7F3300";
	this.lives = 1;

	// Range
	this.showRange = false;
	this.rangeColor = 'rgba(255, 214, 229, 0.1)';

	this.interval;

	this.init();
};

Tower.prototype.init = function() {
	//this.interval = setInterval(this.shoot, this.shootsPerSeconds * 1000);
};

// Draw Tower on canvas
Tower.prototype.draw = function() {

	this.x += 0.5;
	this.canvasContext.fillStyle = this.color;
	this.canvasContext.beginPath();		
	this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	this.canvasContext.fill();

	if(this.showRange) {
		this.canvasContext.beginPath();
		this.canvasContext.fillStyle = this.rangeColor;
		this.canvasContext.arc(this.x, this.y, this.range, 0, Math.PI * 2, true);
		this.canvasContext.fill();
	}


};
// Shoot bullet
Tower.prototype.shoot = function() {
	//this.bullets = new Bullet(this.x, this.y);
};

Tower.prototype.clickEvent = function() {
	this.showRange = !this.showRange;
	console.log(this.showRange );
};

// Remove Tower
Tower.prototype.remove = function() {		
};