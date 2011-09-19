Bullet = function(_context, _posXstart, _posYstart, _posXend, _posYend) { 

	this.posXstart 	= _posXstart;
	this.posYstart 	= _posYstart;
	this.posXend 	= _posXend;
	this.posYend 	= _posYend;
  this.radius = 2;
  this.color = "#111111";
  this.isVisible = true;

  this.bulletShape = new Circle(_context, _posXstart, _posYstart, this.radius, this.color);
  this.bulletCollisionShape = new Rectangle(_context, _posXstart - this.radius, _posYstart - this.radius, this.radius, this.radius, this.color);
  this.xChange = (this.posXend - this.bulletShape.x) / 60;
  this.yChange = (this.posYend - this.bulletShape.y) / 60;
};
//
Bullet.prototype.draw = function() {
  if(this.isVisible) {
    this.bulletShape.x += this.xChange;
    this.bulletShape.y += this.yChange;
    this.bulletCollisionShape.x += this.xChange; 
    this.bulletCollisionShape.y += this.yChange;
    this.bulletShape.draw();	    
  }
};
//
Bullet.prototype.remove = function() {
  this.isVisible = false;
};