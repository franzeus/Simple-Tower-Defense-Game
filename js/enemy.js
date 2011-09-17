Enemy = function(_id, _posX, _posY) { 

	this.id = _id;
	this.posX = _posX;
	this.posY = _posY;
	
	this.speed = 1;
	this.color = "#FF8800";
	this.lives = 1;

	this.interval;

	this.init();
};

Enemy.prototype.init = function() {
	this.interval = setInterval(this.move, this.speed * 1000);
};

// Shoot bullet
Enemy.prototype.draw = function() {
	
};

// Remove Tower
Enemy.prototype.remove = function() {		
};