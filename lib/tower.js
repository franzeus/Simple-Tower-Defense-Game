var Tower, TowerHeavy, TowerLong, TowerNormal, isAllowedToShoot;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
isAllowedToShoot = true;
Tower = (function() {
  function Tower(canvasContext, x, y, radius, range, color, lives, shootsPerSeconds, bulletPower) {
    var that;
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.range = range;
    this.color = color;
    this.lives = lives;
    this.shootsPerSeconds = shootsPerSeconds;
    this.bulletPower = bulletPower;
    that = this;
    this.isDisplayRange = false;
    this.rangeColor = "rgba(255, 214, 229, 0.5)";
    this.shootInterval = 0;
    this.bullets = [];
    this.towerShape = new Circle(this.canvasContext, this.x, this.y, this.radius, this.color);
    this.rangeShape = new Circle(this.canvasContext, this.x, this.y, this.range, this.rangeColor);
    this.collisionShape = new Rectangle(this.canvasContext, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2, this.rangeColor);
    this.rangeCollisionShape = new Rectangle(this.canvasContext, this.x - this.range, this.y - this.range, this.range * 2, this.range * 2, this.rangeColor);
  }
  Tower.prototype.draw = function() {
    if (this.lives > 0) {
      if (this.isDisplayRange) {
        this.showRange();
      }
      return this.towerShape.draw();
    }
  };
  Tower.prototype.shoot = function(_enemyPosX, _enemyPosY) {
    var that;
    if (_enemyPosX == null) {
      _enemyPosX = 0;
    }
    if (_enemyPosY == null) {
      _enemyPosY = 0;
    }
    that = this;
    if (isAllowedToShoot) {
      this.bullets.push(new Bullet(this.canvasContext, this.x, this.y, _enemyPosX, _enemyPosY));
      isAllowedToShoot = false;
      return this.shootInterval = setTimeout(function() {
        return that.releaseShoot();
      }, 1000 / this.shootsPerSeconds);
    }
  };
  Tower.prototype.releaseShoot = function() {
    isAllowedToShoot = true;
    return window.clearTimeout(this.shootInterval);
  };
  Tower.prototype.clickEvent = function() {
    var infoText;
    this.isDisplayRange = !this.isDisplayRange;
    infoText = "Health: " + this.lives + " Range: " + this.range + " ShootsPerSecons: " + this.shootsPerSeconds + " Power: " + this.bulletPower;
    return $("#info").html(infoText);
  };
  Tower.prototype.showRange = function() {
    return this.rangeShape.draw();
  };
  Tower.prototype.setDamage = function() {
    return this.lives--;
  };
  Tower.prototype.moveTo = function(_x, _y) {
    var _results;
    _results = [];
    while (true) {
      this.towerShape.x += (_x - this.towerShape.x) / 10;
      this.towerShape.y + -(_y - this.towerShape.y) / 10;
      setTimeout(this.moveTo, 30);
      if (!(this.towerShape.x === _x && this.towerShape.y === _y)) {
        break;
      }
    }
    return _results;
  };
  return Tower;
})();
TowerNormal = (function() {
  __extends(TowerNormal, Tower);
  function TowerNormal(canvasContext, x, y) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.range = 70;
    this.shootsPerSeconds = 1;
    this.costs = 100;
    this.color = "#111111";
    this.lives = 2;
    this.bulletPower = 0.5;
    TowerNormal.__super__.constructor.call(this, this.canvasContext, this.x, this.y, this.radius, this.range, this.color, this.lives, this.shootsPerSeconds, this.bulletPower);
  }
  return TowerNormal;
})();
TowerLong = (function() {
  __extends(TowerLong, Tower);
  function TowerLong(canvasContext, x, y) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.range = 110;
    this.shootsPerSeconds = 1;
    this.costs = 150;
    this.color = "#111122";
    this.lives = 1;
    this.bulletPower = 0.2;
    TowerLong.__super__.constructor.call(this, this.canvasContext, this.x, this.y, this.radius, this.range, this.color, this.lives, this.shootsPerSeconds, this.bulletPower);
  }
  return TowerLong;
})();
TowerHeavy = (function() {
  __extends(TowerHeavy, Tower);
  function TowerHeavy(canvasContext, x, y) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.range = 60;
    this.shootsPerSeconds = 2;
    this.costs = 250;
    this.color = "#222222";
    this.lives = 4;
    this.bulletPower = 1;
    TowerHeavy.__super__.constructor.call(this, this.canvasContext, this.x, this.y, this.radius, this.range, this.color, this.lives, this.shootsPerSeconds, this.bulletPower);
  }
  return TowerHeavy;
})();