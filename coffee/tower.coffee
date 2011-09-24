isAllowedToShoot = true
class Tower 
    constructor : (@canvasContext, @x, @x) ->
        @isDisplayRange = false
        @rangeColor = "rgba(255, 214, 229, 0.5)"
        shootInterval = 0
        @bullets = []
        @towerShape = new Circle(@canvasContext, @x, @y, @radius, @color)
        @rangeShape = new Circle(@canvasContext, @x, @y, @range, @rangeColor)
        @collisionShape = new Rectangle(@canvasContext, @x - (@radius), @y - (@radius), @radius * 2, @radius * 2, @rangeColor)
        @rangeCollisionShape = new Rectangle(@canvasContext, @x - (@range), @y - (@range), @range * 2, @range * 2, @rangeColor)
	  	
	draw: ->
	  if @lives > 0
	  	@showRange() if @isDisplayRange
	  	@towerShape.draw()

	shoot: (_enemyPosX, _enemyPosY) ->
		if isAllowedToShoot
		    @bullets.push new Bullet(@canvasContext, @x, @y, _enemyPosX, _enemyPosY)
		isAllowedToShoot = false
		shootInterval = setTimeout("releaseShoot()", 1000 / @shootsPerSeconds)

	releaseShoot: ->
  		isAllowedToShoot = true
  		window.clearTimeout shootInterval

	clickEvent: ->
  		@isDisplayRange = not @isDisplayRange
  		infoText = "Health: " + @lives + " Range: " + @range + " ShootsPerSecons: " + @shootsPerSeconds + " Power: " + @bulletPower
  		$("#info").html infoText

	showRange: ->
  		@rangeShape.draw()

	setDamage: ->
  		@lives--	

	moveTo: (_x, _y) ->
  		loop
    		@towerShape.x += (_x - @towerShape.x) / 10
    		@towerShape.y + -(_y - @towerShape.y) / 10
    		setTimeout @moveTo, 30
    		break unless @towerShape.x == _x and @towerShape.y == _y


# ----------------------------------------------
class TowerNormal
	constructor : (@context, @x, @x) ->
		super(@canvasContext, @x, @y)
		@radius = 10
		@range = 60
		@shootsPerSeconds = 1
		@costs = 100
		@color = "#111111"
		@lives = 2

# ----------------------------------------------
class TowerLong
	constructor : (@context, @x, @x) ->
		super(@canvasContext, @x, @y)
		@radius = 30
		@range = 60
		@shootsPerSeconds = 1
		@costs = 100
		@color = "#111111"
		@lives = 2


# ----------------------------------------------
class TowerHeavy
	constructor : (@context, @x, @x) ->
		super(@canvasContext, @x, @y)
		@radius = 30
		@range = 60
		@shootsPerSeconds = 1
		@costs = 100
		@color = "#111111"
		@lives = 2