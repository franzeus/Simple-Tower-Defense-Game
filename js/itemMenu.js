ItemMenu = function(_context, _canvasW, _canvasH) {

	var that = this;

	this.canvasContext = _context;

	this.height = 40;
	this.width = _canvasW;
	this.x = 0;
	this.y = 0;
		
	this.color = "#FFD800";
	this.items = [];
	this.init();
};

ItemMenu.prototype.init = function() {	
	this.items.push(new Circle(this.canvasContext, this.x + 15, this.y + 15, 10, 'rgba(255, 214, 229, 1)'));
};

ItemMenu.prototype.draw = function() {	
	this.items.forEach(function(item) {		
			item.draw();
	});
};

ItemMenu.prototype.clickEvent = function() {

};