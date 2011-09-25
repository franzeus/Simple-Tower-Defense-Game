class Enemy 
  constructor: (@context, @startX, @startY, @endX, @endY, @speed, @color, @lives, @money, @imgSrc) ->  
    @isVisible = true
    @enemyDamageShape = new Rectangle(@context, @startX + 2, @startY - 2, 10, 2, @color)
    @enemyShape = new ImageShape(@context, @startX, @startY, 15, 22, @imgSrc, 0)
    
    @xChange = (@endX - @enemyShape.x) / 1000
    @yChange = (@endY - @enemyShape.y) / 1000

  draw: ->
    if @isVisible
      @enemyShape.x += @xChange
      @enemyShape.y += @yChange
      @enemyDamageShape.x += @xChange
      @enemyDamageShape.y += @yChange
      @enemyShape.draw()
      @enemyDamageShape.draw()  if @lives < 1

  decreaseLive: (_amount) ->
    if @lives - _amount <= 0
      @remove()
      return false
    @enemyDamageShape.width -= _amount * 10
    @lives -= _amount

  remove: ->
    @isVisible = false

  clickEvent: ->
    infoText = "Health: " + @lives
    $("#info").html infoText


# --------------------------------
class Jet extends Enemy
  constructor: (@context, @startX, @startY, @endX, @endY) ->  
    @speed = 1
    @color = "#FF0000"
    @lives = 1
    @damage = 0.8
    @money = 150
    @imgSrc = "images/jet1.png"
    super(@context, @startX, @startY, @endX, @endY, @speed, @color, @lives, @money, @imgSrc)

# --------------------------------
class Helicopter extends Enemy
  constructor: (@context, @startX, @startY, @endX, @endY) ->  
    @speed = 3
    @color = "#FF0000"
    @lives = 0.8
    @money = 100
    @damage = 1
    @imgSrc = "images/helicopter.png"
    super(@context, @startX, @startY, @endX, @endY, @speed, @color, @lives, @money, @imgSrc)


# --------------------------------
class StealthJet extends Enemy
  constructor: (@context, @startX, @startY, @endX, @endY) ->  
    @speed = 2
    @color = "#FF0000"
    @lives = 1.5
    @money = 250
    @damage = 0.5
    @imgSrc = "images/stealthjet.png"
    super(@context, @startX, @startY, @endX, @endY, @speed, @color, @lives, @money, @imgSrc)