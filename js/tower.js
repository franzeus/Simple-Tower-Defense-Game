Tower = function(_id, _posX, _posY) { 

	this.id = _id;
	this.posX = _posX;
	this.posY = _posY;
	
	this.range = 80;
	this.shootsPerSeconds = 15;
	this.costs = 100;
	this.color = "#FF8800";
	this.lives = 1;

	this.interval;

	this.init();
};

Tower.prototype.init = function() {
	this.interval = setInterval(this.shoot, this.shootsPerSeconds * 1000);
};

// Draw Tower on canvas
Tower.prototype.draw = function() {
	
};

// Shoot bullet
Tower.prototype.shoot = function() {
	
};

// Remove Tower
Tower.prototype.remove = function() {		
};