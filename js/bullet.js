Bullet = function(_context, _posXstart, _posYstart, _posXend, _posYend) { 

	this.posXstart 	= _posXstart;
	this.posYstart 	= _posYstart;
	this.posXend 	= _posXend;
	this.posYend 	= _posYend;
  this.color = "#00FF00";

  this.bulletShape = new Circle(_context, _posXstart, _posYstart, 2, this.color);
  this.xChange = (this.posXend - this.bulletShape.x) / 100;
  this.yChange = (this.posYend - this.bulletShape.y) / 100;
};
//
Bullet.prototype.draw = function() {
  this.bulletShape.x += this.xChange;
  this.bulletShape.y += this.yChange;
  this.bulletShape.draw();	
};