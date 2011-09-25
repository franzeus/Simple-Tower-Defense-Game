var Game;
Game = (function() {
  function Game() {
    this.FPS = 50;
    this.canvas = document.getElementById("canvas");
    this.buffer = document.getElementById("buffer-canvas");
    this.buffer.width = this.canvas.width;
    this.buffer.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this._canvasContext = this.buffer.getContext("2d");
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;
    $("#canvas").mousedown($.proxy(this.clickEvent, this));
    $(".createTowerButton").click($.proxy(this.initAddTower, this));
    $(".startGameButton").click($.proxy(this.start, this));
    $(document).keydown($.proxy(this.keyEvents, this));
    this.drawNewTower = false;
    this.newTowerType;
    this.towerShapeTemplate = null;
    this.activeUnit = null;
    this.start();
  }
  Game.prototype.start = function() {
    var that;
    that = this;
    this.base = null;
    this.towers = [];
    this.enemies = [];
    this.player = new Player(1, 1200);
    this.base = new Base(this._canvasContext, this.WIDTH, this.HEIGHT);
    this.interval = window.setInterval(function() {
      return that.draw();
    }, 1000 / this.FPS);
    return this.spawnInterval = window.setInterval(function() {
      return that.createEnemy();
    }, 4000);
  };
  Game.prototype.draw = function() {
    var that;
    that = this;
    this.clearCanvas();
    this.base.draw();
    this.towers.forEach(function(tower) {
      if (tower.lives > 0) {
        tower.draw();
        return tower.bullets.forEach(function(bullet) {
          if (that.isColliding(bullet.bulletCollisionShape, tower.rangeCollisionShape) && bullet.isVisible) {
            return bullet.draw();
          }
        });
      }
    });
    this.enemies.forEach(function(enemy) {
      return enemy.draw();
    });
    this.update();
    if (this.drawNewTower) {
      this.towerShapeTemplate.draw();
    }
    return this.context.drawImage(this.buffer, 0, 0);
  };
  Game.prototype.update = function() {
    if (this.base.lives <= 0) {
      this.stop();
    }
    return this.checkCollision();
  };
  Game.prototype.clearCanvas = function() {
    this.canvas.width = this.WIDTH;
    return this._canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  };
  Game.prototype.stop = function() {
    clearInterval(this.interval);
    clearInterval(this.spawnInterval);
    return this.interval = 0;
  };
  Game.prototype.checkCollision = function() {
    var base, player, that, towers;
    base = this.base;
    towers = this.towers;
    that = this;
    player = this.player;
    return this.enemies.forEach(function(enemy) {
      if (enemy.isVisible) {
        if (that.isColliding(enemy.enemyShape, base)) {
          enemy.remove();
          base.setDamage();
        }
        return towers.forEach(function(tower) {
          if (tower.lives > 0) {
            tower.bullets.forEach(function(bullet) {
              if (bullet.isVisible) {
                if (that.isColliding(bullet.bulletCollisionShape, enemy.enemyShape)) {
                  enemy.decreaseLive(tower.bulletPower);
                  if (enemy.lives <= 0) {
                    player.addMoney(enemy.money);
                  }
                  return bullet.remove();
                }
              }
            });
            if (that.isColliding(enemy.enemyShape, tower.collisionShape)) {
              enemy.remove();
              tower.setDamage();
            }
            if (that.isColliding(enemy.enemyShape, tower.rangeCollisionShape)) {
              return tower.shoot(enemy.enemyShape.x, enemy.enemyShape.y);
            }
          }
        });
      }
    });
  };
  Game.prototype.clickEvent = function(e) {
    var x, y;
    x = this.getMousePosition(e)[0];
    y = this.getMousePosition(e)[1];
    this.towers.forEach(function(tower) {
      if (x >= tower.collisionShape.x && x <= (tower.collisionShape.x + tower.collisionShape.width) && y >= tower.collisionShape.y && y <= tower.collisionShape.y + tower.collisionShape.height) {
        return tower.clickEvent();
      }
    });
    return this.enemies.forEach(function(enemy) {
      if (x >= enemy.enemyShape.x && x <= (enemy.enemyShape.x + enemy.enemyShape.width) && y >= enemy.enemyShape.y && y <= enemy.enemyShape.y + enemy.enemyShape.height) {
        return enemy.clickEvent();
      }
    });
  };
  Game.prototype.keyEvents = function(e) {
    switch (e.keyCode) {
      case 82.:
        return this.toggleTowerRanges();
    }
  };
  Game.prototype.createEnemy = function() {
    var plusMinus, randomX, randomY;
    plusMinus = this.getRandomNumber(0, 3);
    if (plusMinus === 0) {
      randomX = this.getRandomNumber(0, this.WIDTH) - this.WIDTH;
      randomY = this.getRandomNumber(0, this.HEIGHT) - this.HEIGHT;
    } else if (plusMinus === 1) {
      randomX = this.getRandomNumber(0, this.WIDTH) + this.WIDTH;
      randomY = this.getRandomNumber(0, this.HEIGHT) - this.HEIGHT;
    } else if (plusMinus === 2) {
      randomX = this.getRandomNumber(0, this.WIDTH) - this.WIDTH;
      randomY = this.getRandomNumber(0, this.HEIGHT) + this.HEIGHT;
    } else {
      randomX = this.getRandomNumber(0, this.WIDTH) + this.WIDTH;
      randomY = this.getRandomNumber(0, this.HEIGHT) + this.HEIGHT;
    }
    return this.enemies.push(new Enemy(this._canvasContext, randomX, randomY, this.base.x + (this.base.width / 2), this.base.y + (this.base.height / 2)));
  };
  Game.prototype.initAddTower = function(e) {
    if (this.player.money - 100 < 0) {
      return false;
    }
    this.newTowerType = e.currentTarget.id;
    this.drawNewTower = true;
    this.towerShapeTemplate = new Circle(this._canvasContext, e.pageX, e.pageY, 15, "rgba(17, 17, 17, 0.8)");
    $("#canvas").mousemove($.proxy(this.bindTowerToMouse, this));
    return $("#canvas").mousedown($.proxy(this.createTower, this));
  };
  Game.prototype.bindTowerToMouse = function(e) {
    if (this.drawNewTower) {
      this.towerShapeTemplate.x = this.getMousePosition(e)[0];
      return this.towerShapeTemplate.y = this.getMousePosition(e)[1];
    }
  };
  Game.prototype.createTower = function(e) {
    var newTowerObj;
    newTowerObj = null;
    if (this.newTowerType === "long") {
      newTowerObj = new TowerLong(this._canvasContext, this.getMousePosition(e)[0], this.getMousePosition(e)[1]);
    } else if (this.newTowerType === "heavy") {
      newTowerObj = new TowerHeavy(this._canvasContext, this.getMousePosition(e)[0], this.getMousePosition(e)[1]);
    } else {
      newTowerObj = new TowerNormal(this._canvasContext, this.getMousePosition(e)[0], this.getMousePosition(e)[1]);
    }
    this.towers.push(newTowerObj);
    this.player.reduceMoney(newTowerObj.costs);
    e.stopPropagation();
    this.drawNewTower = false;
    $("#canvas").unbind("mousemove", this.createTower);
    return $("#canvas").unbind("mousedown", this.createTower);
  };
  Game.prototype.toggleTowerRanges = function() {
    var show;
    show = !this.isDisplayRange;
    this.towers.forEach(function(tower) {
      return tower.isDisplayRange = show;
    });
    return this.isDisplayRange = !this.isDisplayRange;
  };
  Game.prototype.getRandomNumber = function(min, max) {
    if (min > max) {
      return -1;
    }
    if (min === max) {
      return min;
    }
    return min + parseInt(Math.random() * (max - min + 1));
  };
  Game.prototype.getMousePosition = function(e) {
    var x, y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= $("canvas").offset().left;
    y -= $("canvas").offset().top;
    return [x, y];
  };
  Game.prototype.isColliding = function(obj1, obj2) {
    if (obj1.x > obj2.x && obj1.x < (obj2.x + obj2.width) && obj1.y > obj2.y && obj1.y < (obj2.y + obj2.height)) {
      return true;
    }
    return false;
  };
  return Game;
})();