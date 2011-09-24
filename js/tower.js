var isAllowedToShoot = true; // .. dont like this
// Base Class
Tower = function(_context, _posX, _posY, _color, _radius, _range) { 
	if(!_context) console.log("No Context in Base");
	this.init(_context, _posX, _posY, _color, _radius, _range);
};

Tower.prototype.init = function(_context, _posX, _posY, _color, _radius, _range) {

	this.canvasContext = _context;
	this.x = _posX;
	this.y = _posY;	
	this.radius = _radius;
	this.range = _range;
	this.color = _color;

	// Range
	this.isDisplayRange = false;
	this.rangeColor = 'rgba(255, 214, 229, 0.5)';

	this.bullets = [];

	// Shape of sprites
	this.towerShape = new Circle( this.canvasContext ,this.x, this.y, this.radius, this.color );
	this.rangeShape = new Circle( this.canvasContext ,this.x, this.y, this.range, this.rangeColor );

	// Shapes for collision detection
	this.collisionShape = new Rectangle( this.canvasContext ,this.x - (this.radius), this.y - (this.radius), this.radius * 2, this.radius * 2, this.rangeColor );
	this.rangeCollisionShape = new Rectangle( this.canvasContext ,this.x - (this.range), this.y - (this.range), this.range * 2, this.range * 2, this.rangeColor );

	var shootInterval = 0;
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
		shootInterval = setTimeout("releaseShoot()", 1000 / this.shootsPerSeconds);
	}
};

//
var releaseShoot = function() {
	isAllowedToShoot = true;
	window.clearTimeout(shootInterval);
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

// Move unit to x,y
Tower.prototype.moveTo = function(_x, _y) {
	//if(this.towerShape.x == _x && this.towerShape.y == _y)
	//	return false;

	console.log("jep");
	do {
		this.towerShape.x += (_x - this.towerShape.x) / 10;
		this.towerShape.y +- (_y - this.towerShape.y) / 10;
		setTimeout(this.moveTo, 30);
	}
	while(this.towerShape.x == _x && this.towerShape.y == _y);

};

// -----------------------------------
// NORMAL TOWER
TowerNormal = function(_context, _posX, _posY) {
	if(!_context) console.log("No Context for TowerBaseClass");
	this.init(_context, _posX, _posY);
}
TowerNormal.prototype = new Tower();
TowerNormal.prototype.constructor = Tower;
TowerNormal.parent = Tower.prototype;
//
TowerNormal.prototype.init = function(_context, _posX, _posY) {
	this.name = "normal";
	this.radius = 10;
	this.range = 60;
	this.shootsPerSeconds = 1;
	this.costs = 100;
	this.color = '#111111';
	this.lives = 2;
	this.shootsPerSeconds = 2;
	this.bulletPower = 0.5;
};


// -----------------------------------
// LONG RANGE TOWER
TowerLong = function(_context, _posX, _posY) {
	this.constructor = Tower(_context, _posX, _posY, this.color, this.radius, this.range);
	
	this.name = "long";
	this.costs = 150;
	this.radius = 15;
	this.range = 100;
	this.lives = 1;
	this.color = '#00111F';
	this.shootsPerSeconds = 3;
	this.bulletPower = 0.2;
};
TowerLong.prototype = new Tower();

// -----------------------------------
// HEAVY TOWER
TowerHeavy = function(_context, _posX, _posY) {
	this.constructor = Tower(_context, _posX, _posY, this.color, this.radius, this.range);	
	
	this.name = "heavy";
	this.costs = 200;
	this.radius = 20;
	this.range = 50;
	this.lives = 4;
	this.color = '#222222';
	this.shootsPerSeconds = 2;
	this.bulletPower = 1;
};
TowerHeavy.prototype = new Tower();