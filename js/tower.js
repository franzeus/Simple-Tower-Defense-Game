var isAllowedToShoot = true; // .. dont like this
Tower = function(_context, _posX, _posY, _costs, _radius, _range, _lives, _color, _shootInterval, _bulletPower) { 
	this.canvasContext = _context;

	this.id = 1;
	this.x = _posX;
	this.y = _posY;
	
	this.radius = _radius;
	this.size = _radius;
	this.range = _range;
	this.shootsPerSeconds = _shootInterval;
	this.costs = _costs;
	this.color = _color;
	this.lives = _lives;
	this.bulletPower = _bulletPower;

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

	this.shootInterval = 0;
	this.init();
};

Tower.prototype.init = function() {
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
	if(isAllowedToShoot){
		this.bullets.push(new Bullet(this.canvasContext, this.x, this.y, _enemyPosX, _enemyPosY));
		isAllowedToShoot = false;
		this.shootInterval = setTimeout("releaseShoot()", 1000 / this.shootsPerSeconds);
	}
};

var releaseShoot = function() {
	isAllowedToShoot = true;
	window.clearTimeout(this.shootInterval);
}

//
Tower.prototype.clickEvent = function() {
	this.isDisplayRange = !this.isDisplayRange;

	var infoText = "Health: " + this.lives + " Range: " + this.range + " ShootsPerSecons: " + this.shootsPerSeconds + " Power: " + this.bulletPower;
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


// ------- SPECIALIZATION ---------- //

TowerNormal = function(_context, _posX, _posY, _costs, _radius, _range, _lives, _color) {
	this.canvasContext = _context;
	this.radius = 30;
	this.x = _posX;
	this.y = _posY;
	
	this.radius = _radius;
	this.size = _radius;
	this.range = _range;
	this.shootsPerSeconds = 1;
	this.costs = _costs;
	this.color = '#FF2899';
	this.lives = _lives;
}
TowerNormal.prototype = new Tower();
TowerNormal.prototype.constructor = Tower;


TowerLong = function() {



}
TowerLong.prototype = new Tower();
TowerLong.prototype.constructor = Tower;