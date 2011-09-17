Vip = function(_context, _canvasW, _canvasH) {

	var that = this;
	this.x;
	this.y;	

	this.canvasContext = _context;

	this.height = 40;
	this.width = 40;
	this.posX = (_canvasW / 2) - (this.width / 2);
	this.posY = (_canvasH / 2) - (this.height / 2);
		
	this.color = "#FF00FF";
	this.lives = 1;

	this.interval;

	this.init();
};

Vip.prototype.init = function() {	

	
};

Vip.prototype.draw = function() {	
	console.log("draw VIP");
	//this.canvasContext.fillStyle = this.color; //'rgba(50, 50, 80, 1)';
	//this.canvasContext.fillRect(that.x, that.y, that.width, that.height);
};