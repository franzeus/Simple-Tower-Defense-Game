(function() {
  var Bullet;
  Bullet = (function() {
    function Bullet(canvasContext, posXstart, posYstart, posXend, posYend) {
      this.canvasContext = canvasContext;
      this.posXstart = posXstart;
      this.posYstart = posYstart;
      this.posXend = posXend;
      this.posYend = posYend;
      this.radius = 2;
      this.color = "#111111";
      this.isVisible = true;
      this.bulletShape = new Circle(this.canvasContext, this.posXstart, this.posYstart, this.radius, this.color);
      this.bulletCollisionShape = new Rectangle(this.canvasContext, this.posXstart - this.radius, this.posYstart - this.radius, this.radius, this.radius, this.color);
      this.xChange = (this.posXend - this.bulletShape.x) / 60;
      this.yChange = (this.posYend - this.bulletShape.y) / 60;
    }
    Bullet.prototype.draw = function() {
      if (this.isVisible) {
        this.bulletShape.x += this.xChange;
        this.bulletShape.y += this.yChange;
        this.bulletCollisionShape.x += this.xChange;
        this.bulletCollisionShape.y += this.yChange;
        return this.bulletShape.draw();
      }
    };
    Bullet.prototype.remove = function() {
      return this.isVisible = false;
    };
    return Bullet;
  })();
}).call(this);
