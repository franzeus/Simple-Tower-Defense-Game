class Bullet 
 constructor: (@canvasContext, @posXstart, @posYstart, @posXend, @posYend) ->     
      @radius = 2
      @color = "#111111"
      @isVisible = true
      @bulletShape = new Circle(@canvasContext, @posXstart, @posYstart, @radius, @color)
      @bulletCollisionShape = new Rectangle(@canvasContext, @posXstart - @radius, @posYstart - @radius, @radius, @radius, @color)
      @xChange = (@posXend - @bulletShape.x) / 60
      @yChange = (@posYend - @bulletShape.y) / 60

  draw: ->
    if @isVisible
      @bulletShape.x += @xChange
      @bulletShape.y += @yChange
      @bulletCollisionShape.x += @xChange
      @bulletCollisionShape.y += @yChange
      @bulletShape.draw()

  remove: ->
    @isVisible = false