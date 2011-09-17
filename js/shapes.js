Circle = function(_context, _x, _y, _r, _color) {	

	this.radius = _r;
	this.x = _x;
	this.y = _y;
	this.color = _color;
	this.canvasContext = _context;
};
//
Circle.prototype.draw = function() {
	this.canvasContext.beginPath();
	this.canvasContext.fillStyle = this.color;
	this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	this.canvasContext.fill();
}

// -------------------------------------------------

Rectangle = function(_context, _x, _y, _w, _h, _color) {	
	this.x = _x;
	this.y = _y;
	this.width = _w;
	this.height = _h
	this.color = _color;
	this.canvasContext = _context;
};
//
Rectangle.prototype.draw = function() {
	this.canvasContext.fillStyle = this.color;
	this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
}

// -------------------------------------------------

ImageShape = function(_context, _x, _y, _w, _h, _src) {
	this.x = _x;
	this.y = _y;
	this.width = _w;
	this.height = _h
	this.src = _src;
	this.img = new Image();
	this.canvasContext = _context;
};
//
ImageShape.prototype.draw = function() {
	this.canvasContext.drawImage(this.img, this.x, this.y, this.width, this.height);
}