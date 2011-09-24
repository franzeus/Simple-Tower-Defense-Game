(function() {
  var Game, randomX, randomY;
  Game = (function() {
    function Game() {
      var interval;
      this.FPS = 50;
      interval = 0;
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
      this.towerTypes = [["normal", 100, 10, 60, 2, "#111111", 1, 0.5], ["long", 150, 15, 100, 1, "#00111F", 2, 0.2], ["heavy", 200, 20, 50, 4, "#222222", 2, 1]];
      this.newTowerType;
      this.m = null;
      this.activeUnit = null;
      this.start();
    }
    Game.prototype.start = function() {
      var that;
      that = this;
      this.base = null;
      this.towers = [];
      this.enemies = [];
      this.player = null;
      return this.base = new Base(this._canvasContext, this.WIDTH, this.HEIGHT);
    };
    return Game;
  })();
  ({
    draw: function() {
      var that;
      return that = this;
    }
  });
  this.clearCanvas();
  this.base.draw();
  this.towers.forEach(function(tower) {
    if (tower.lives > 0) {
      tower.draw();
      tower.bullets.forEach(function(bullet) {});
      if (that.isColliding(bullet.bulletCollisionShape, tower.rangeCollisionShape) && bullet.isVisible) {
        return bullet.draw();
      }
    }
  });
  this.enemies.forEach(function(enemy) {
    return enemy.draw();
  });
  this.update();
  if (this.drawNewTower) {
    this.m.draw();
  }
  this.context.drawImage(this.buffer, 0, 0);
  ({
    update: function() {
      this.checkCollision();
      if (this.base.lives <= 0) {
        return this.stop();
      }
    },
    clearCanvas: function() {
      this.canvas.width = this.WIDTH;
      return this._canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    },
    stop: function() {
      var interval;
      clearInterval(interval);
      return interval = 0;
    },
    checkCollision: function() {
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
    },
    clickEvent: function(e) {
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
    },
    keyEvents: function(e) {
      switch (e.keyCode) {
        case 82.:
          return this.toggleTowerRanges();
      }
    },
    createEnemy: function() {
      var plusMinus;
      return plusMinus = this.getRandomNumber(0, 3);
    }
  });
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
    this.enemies.push(new Enemy(this._canvasContext, randomX, randomY, this.base.x + (this.base.width / 2), this.base.y + (this.base.height / 2)));
  }
  ({
    initAddTower: function(e) {
      if (this.player.money - 100 < 0) {
        return false;
      }
    }
  });
  this.newTowerType = this.towerTypes[e.currentTarget.id];
  this.drawNewTower = true;
  this.m = new Circle(this._canvasContext, e.pageX, e.pageY, this.newTowerType[2] + 5, "rgba(17, 17, 17, 0.8)");
  $("#canvas").mousemove($.proxy(this.bindTowerToMouse, this));
  $("#canvas").mousedown($.proxy(this.createTower, this));
  ({
    bindTowerToMouse: function(e) {
      if (this.drawNewTower) {
        this.m.x = this.getMousePosition(e)[0];
        return this.m.y = this.getMousePosition(e)[1];
      }
    },
    createTower: function(e) {
      this.towers.push(new Tower(this._canvasContext, this.getMousePosition(e)[0], this.getMousePosition(e)[1], this.newTowerType[1], this.newTowerType[2], this.newTowerType[3], this.newTowerType[4], this.newTowerType[5], this.newTowerType[6], this.newTowerType[7]));
      this.player.reduceMoney(this.newTowerType[1]);
      e.stopPropagation();
      this.drawNewTower = false;
      this.newTowerType = [];
      $("#canvas").unbind("mousemove", this.createTower);
      return $("#canvas").unbind("mousedown", this.createTower);
    },
    toggleTowerRanges: function() {
      var show;
      show = !this.isDisplayRange;
      this.towers.forEach(function(tower) {
        return tower.isDisplayRange = show;
      });
      return this.isDisplayRange = !this.isDisplayRange;
    },
    getRandomNumber: function(min, max) {
      if (min > max) {
        return -1;
      }
      if (min === max) {
        return min;
      }
      return min + parseInt(Math.random() * (max - min + 1));
    },
    getMousePosition: function(e) {
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
    },
    isColliding: function(obj1, obj2) {
      if (obj1.x > obj2.x && obj1.x < (obj2.x + obj2.width) && obj1.y > obj2.y && obj1.y < (obj2.y + obj2.height)) {
        return true;
      }
      return false;
    }
  });
}).call(this);