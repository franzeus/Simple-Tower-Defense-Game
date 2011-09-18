Base = function(_context, _canvasW, _canvasH) {

	var that = this;

	this.canvasContext = _context;

	this.height = 40;
	this.width = 40;
	this.x = (_canvasW / 2) - (this.width / 2);
	this.y = (_canvasH / 2) - (this.height / 2);
		
	this.color = "#FFD800";
	this.lives = 15;

	this.baseShape = new Rectangle(_context, this.x, this.y, this.width, this.height, this.color  );
	
	$("#baseLive").val(this.lives);
};

Base.prototype.draw = function() {	
	this.baseShape.draw();
};
//
Base.prototype.setDamage = function() {	
		this.lives--;
		$("#baseLive").val(this.lives);
};
