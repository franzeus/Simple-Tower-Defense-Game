Tower = function(_context, _posX, _posY) { 

	this.canvasContext = _context;

	this.id = 1;
	this.x = _posX;
	this.y = _posY;
	
	this.radius = 10;
	this.size = 30;
	this.range = 60;
	this.shootsPerSeconds = 1;
	this.costs = 100;
	this.color = "#111111";
	this.lives = 2;

	// Range
	this.isDisplayRange = false;
	this.rangeColor = 'rgba(255, 214, 229, 0.5)';

	this.bullets = [];

	// Shape of sprites
	this.towerShape = new Circle( _context ,this.x, this.y, this.radius, this.color );
	this.rangeShape = new Circle( _context ,this.x, this.y, this.range, this.rangeColor );

	// Shapes for collision detection
	this.collisionShape = new Rectangle( _context ,this.x - (this.radius), this.y - (this.radius), this.radius * 2, this.radius * 2, this.rangeColor );
	this.rangeCollisionShape = new Rectangle( _context ,this.x - (this.range), this.y - (this.range), this.range * 2, this.range * 2, this.rangeColor );

	this.shootInterval;
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
	if(!this.shootInterval) {
		this.shootInterval = setInterval(this.shoot, this.shootsPerSeconds * 1000);
		var posEndX = _enemyPosX;
		var posEndY = _enemyPosY;
		this.bullets.push(new Bullet(this.canvasContext, this.x, this.y, posEndX, posEndY));
		clearInterval(this.shootInterval);
	}

};

Tower.prototype.clickEvent = function() {
	this.isDisplayRange = !this.isDisplayRange;

	var infoText = "Health: " + this.lives + " Range: " + this.range + " ShootsPerSecons: " + this.shootsPerSeconds;
	$("#info").html(infoText);
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