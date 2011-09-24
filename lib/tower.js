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
  function Tower(canvasContext, x, x) {
    var shootInterval;
    this.canvasContext = canvasContext;
    this.x = x;
    this.x = x;
    this.isDisplayRange = false;
    this.rangeColor = "rgba(255, 214, 229, 0.5)";
    shootInterval = 0;
    this.bullets = [];
    this.towerShape = new Circle(this.canvasContext, this.x, this.y, 20, this.color);
    this.rangeShape = new Circle(this.canvasContext, this.x, this.y, 100, this.rangeColor);
    //this.collisionShape = new Rectangle(this.canvasContext, this.x - 100, this.y - this.radius, this.radius * 2, this.radius * 2, this.rangeColor);
    //this.rangeCollisionShape = new Rectangle(this.canvasContext, this.x - 100, this.y - this.range, this.range * 2, this.range * 2, this.rangeColor);
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
    var shootInterval;
    if (_enemyPosX == null) {
      _enemyPosX = 0;
    }
    if (_enemyPosY == null) {
      _enemyPosY = 0;
    }
    if (isAllowedToShoot) {
      this.bullets.push(new Bullet(this.canvasContext, this.x, this.y, _enemyPosX, _enemyPosY));
      isAllowedToShoot = false;
      return shootInterval = setTimeout("releaseShoot()", 1000 / this.shootsPerSeconds);
    }
  };
  Tower.prototype.releaseShoot = function() {
    isAllowedToShoot = true;
    return window.clearTimeout(shootInterval);
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
    TowerNormal.__super__.constructor.call(this, this.canvasContext, this.x, this.y);
    this.radius = 10;
    this.range = 60;
    this.shootsPerSeconds = 1;
    this.costs = 100;
    this.color = "#111111";
    this.lives = 2;
  }
  return TowerNormal;
})();
TowerLong = (function() {
  __extends(TowerLong, Tower);
  function TowerLong(canvasContext, x, y) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    TowerLong.__super__.constructor.call(this, this.canvasContext, this.x, this.y);
    this.radius = 30;
    this.range = 60;
    this.shootsPerSeconds = 1;
    this.costs = 100;
    this.color = "#111111";
    this.lives = 2;
  }
  return TowerLong;
})();
TowerHeavy = (function() {
  __extends(TowerHeavy, Tower);
  function TowerHeavy(canvasContext, x, y) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    TowerHeavy.__super__.constructor.call(this, this.canvasContext, this.x, this.y);
    this.radius = 30;
    this.range = 60;
    this.shootsPerSeconds = 1;
    this.costs = 100;
    this.color = "#111111";
    this.lives = 2;
  }
  return TowerHeavy;
})();