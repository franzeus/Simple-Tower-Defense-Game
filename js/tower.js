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
	this.lives = 2;	

	// Range
	this.isDisplayRange = false;
	this.rangeColor = 'rgba(255, 214, 229, 0.4)';

	this.bullets = [];

	// Shape of sprites
	this.towerShape = new Circle( _context ,this.x, this.y, this.radius, this.color );
	this.rangeShape = new Circle( _context ,this.x, this.y, this.range, this.rangeColor );

	this.interval;
	this.init();
};

Tower.prototype.init = function() {
	//this.interval = setInterval(this.shoot, this.shootsPerSeconds * 1000);
};

// Draw Tower on canvas
Tower.prototype.draw = function() {
	if(this.lives > 0) {
		if(this.isDisplayRange)
			this.showRange();	
		this.towerShape.draw();
	}
};
// Shoot bullet
Tower.prototype.shoot = function(_enemyPosX, _enemyPosY) {
	var posEndX = _enemyPosX;
	var posEndY = _enemyPosY;
	this.bullets.push(new Bullet(this.canvasContext, this.x, this.y, posEndX, posEndY));
};

Tower.prototype.clickEvent = function() {
	this.isDisplayRange = !this.isDisplayRange;
};

// Display range circle
Tower.prototype.showRange = function() {
	this.rangeShape.draw();
};

//
Tower.prototype.setDamage = function() {
	this.lives--;
};

// Remove Tower
Tower.prototype.remove = function() {
};