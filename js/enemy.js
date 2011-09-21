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
	this.radius = 2;
	this.money = 50;

	
	this.enemyDamageShape = new Rectangle(_context, this.startX + 2, this.startY - 2, 10, 2, this.color);
	this.enemyShape = new ImageShape(_context, this.startX, this.startY, 15, 22, "images/jet.gif", 0);

	// Calculate inclination
	this.xChange = (this.endX - this.enemyShape.x) / 1000;
	this.yChange = (this.endY - this.enemyShape.y) / 1000;
	//this.enemyShape.angle = parseInt(Math.acos((this.startX * this.endX) + (this.startY * this.endY)));
	// w = acos( u * v / |u| * |v|)
	
};
//
Enemy.prototype.draw = function() {
	if(this.isVisible) {
		this.enemyShape.x += this.xChange;
		this.enemyShape.y += this.yChange		
		this.enemyDamageShape.x += this.xChange;
		this.enemyDamageShape.y += this.yChange;
		this.enemyShape.draw();
		if(this.lives < 1)
			this.enemyDamageShape.draw();
	}
};

//
Enemy.prototype.decreaseLive = function(_amount) {
	if(this.lives - _amount <= 0) {		
		this.remove();
		return false;
	}
	this.enemyDamageShape.width -= _amount * 10;
	this.lives -= _amount;
};

//
Enemy.prototype.remove = function() {
	this.isVisible = false;
};

//
Enemy.prototype.clickEvent = function() {
	var infoText = "Health: " + this.lives;
	$("#info").html(infoText);
};