var Enemy;
Enemy = (function() {
  function Enemy(context, startX, startY, endX, endY) {
    this.context = context;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.speed = 1;
    this.color = "#FF0000";
    this.lives = 1;
    this.isVisible = true;
    this.radius = 2;
    this.money = 50;
    this.enemyDamageShape = new Rectangle(this.context, this.startX + 2, this.startY - 2, 10, 2, this.color);
    this.enemyShape = new ImageShape(this.context, this.startX, this.startY, 15, 22, "images/jet.gif", 0);
    this.xChange = (this.endX - this.enemyShape.x) / 1000;
    this.yChange = (this.endY - this.enemyShape.y) / 1000;
  }
  Enemy.prototype.draw = function() {
    if (this.isVisible) {
      this.enemyShape.x += this.xChange;
      this.enemyShape.y += this.yChange;
      this.enemyDamageShape.x += this.xChange;
      this.enemyDamageShape.y += this.yChange;
      this.enemyShape.draw();
      if (this.lives < 1) {
        return this.enemyDamageShape.draw();
      }
    }
  };
  Enemy.prototype.decreaseLive = function(_amount) {
    if (this.lives - _amount <= 0) {
      this.remove();
      return false;
    }
    this.enemyDamageShape.width -= _amount * 10;
    return this.lives -= _amount;
  };
  Enemy.prototype.remove = function() {
    return this.isVisible = false;
  };
  Enemy.prototype.clickEvent = function() {
    var infoText;
    infoText = "Health: " + this.lives;
    return $("#info").html(infoText);
  };
  return Enemy;
})();