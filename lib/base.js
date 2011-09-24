(function() {
  var Base;
  Base = (function() {
    function Base(canvasContext, _canvasW, _canvasH) {
      this.canvasContext = canvasContext;
      this.height = 40;
      this.width = 40;
      this.x = (_canvasW / 2) - (this.width / 2);
      this.y = (_canvasH / 2) - (this.height / 2);
      this.color = "#FFD800";
      this.lives = 1;
      this.baseShape = new Rectangle(this.canvasContext, this.x, this.y, this.width, this.height, this.color);
      $("#baseLive").val(this.lives);
    }
    Base.prototype.draw = function() {
      return this.baseShape.draw();
    };
    Base.prototype.setDamage = function() {
      this.lives--;
      return $("#baseLive").val(this.lives);
    };
    return Base;
  })();
}).call(this);
