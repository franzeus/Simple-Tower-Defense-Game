class Enemy 
  constructor: (@context, @startX, @startY, @endX, @endY) ->  
    @speed = 1
    @color = "#FF0000"
    @lives = 1
    @isVisible = true
    @radius = 2
    @money = 50

    @enemyDamageShape = new Rectangle(@context, @startX + 2, @startY - 2, 10, 2, @color)
    @enemyShape = new ImageShape(@context, @startX, @startY, 15, 22, "images/jet.gif", 0)
    
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
    console.log _amount
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