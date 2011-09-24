(function() {
  var Tower, TowerHeavy, TowerLong, TowerNormal, isAllowedToShoot;
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
      this.towerShape = new Circle(this.canvasContext, this.x, this.y, this.radius, this.color);
      this.rangeShape = new Circle(this.canvasContext, this.x, this.y, this.range, this.rangeColor);
      this.collisionShape = new Rectangle(this.canvasContext, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2, this.rangeColor);
      this.rangeCollisionShape = new Rectangle(this.canvasContext, this.x - this.range, this.y - this.range, this.range * 2, this.range * 2, this.rangeColor);
    }
    return Tower;
  })();
  ({
    draw: function() {
      if (this.lives > 0) {
        if (this.isDisplayRange) {
          this.showRange();
        }
        return this.towerShape.draw();
      }
    },
    shoot: function(_enemyPosX, _enemyPosY) {
      var shootInterval;
      if (isAllowedToShoot) {
        this.bullets.push(new Bullet(this.canvasContext, this.x, this.y, _enemyPosX, _enemyPosY));
      }
      isAllowedToShoot = false;
      return shootInterval = setTimeout("releaseShoot()", 1000 / this.shootsPerSeconds);
    },
    releaseShoot: function() {
      isAllowedToShoot = true;
      return window.clearTimeout(shootInterval);
    },
    clickEvent: function() {
      var infoText;
      this.isDisplayRange = !this.isDisplayRange;
      infoText = "Health: " + this.lives + " Range: " + this.range + " ShootsPerSecons: " + this.shootsPerSeconds + " Power: " + this.bulletPower;
      return $("#info").html(infoText);
    },
    showRange: function() {
      return this.rangeShape.draw();
    },
    setDamage: function() {
      return this.lives--;
    },
    moveTo: function(_x, _y) {
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
    }
  });
  TowerNormal = (function() {
    function TowerNormal(context, x, x) {
      this.context = context;
      this.x = x;
      this.x = x;
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
    function TowerLong(context, x, x) {
      this.context = context;
      this.x = x;
      this.x = x;
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
    function TowerHeavy(context, x, x) {
      this.context = context;
      this.x = x;
      this.x = x;
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
}).call(this);
