Enemy = function(_context, _posX, _posY, _endPosX, _endPosY) { 

	this.canvasContext = _context;
	this.startX = _posX;
	this.startY = _posY;
	this.endX = _endPosX;
	this.endY = _endPosY;
	
	this.speed = 1;
	this.color = "#FF0000";
	this.lives = 1;
	this.isVisible = true;
	this.radius = 5;

	//this.enemyShape = new Circle(_context, this.startX, this.startY, this.radius, this.color);
	this.enemyShape = new ImageShape(_context, this.startX, this.startY, 15, 22, "images/jet.gif", 0);
	// Calculate inclination
	this.xChange = (this.endX - this.enemyShape.x) / 1000;
	this.yChange = (this.endY - this.enemyShape.y) / 1000;

	//this.enemyShape.angle = parseInt(Math.acos((this.startX * this.endX) + (this.startY * this.endY)));
	
};
//
Enemy.prototype.draw = function() {
	if(this.isVisible) {
		this.enemyShape.x += this.xChange;
		this.enemyShape.y += this.yChange;
		this.enemyShape.draw();
	}
};
//
Enemy.prototype.remove = function() {
	this.isVisible = false;
};