# Base Class
class Shape 
	constructor: (@canvasContext, @x, @y, @color) ->

# -------------------------------------------------
class Circle extends Shape
	constructor : (@canvasContext, @x, @y, @color, @radius) ->
    super(@canvasContext, @x, @y, @color)

	draw: ->
	  @canvasContext.beginPath
	  @canvasContext.fillStyle = @color
	  @canvasContext.arc @x, @y, @radius, 0, Math.PI * 2, true
	  @canvasContext.fill

# -------------------------------------------------
class Rectangle extends Shape
	constructor : (@canvasContext, @x, @y, @width, @height, @color) ->
    super(@canvasContext, @x, @y, @color)
    
   draw: ->
   	@canvasContext.fillStyle = @color
    @canvasContext.fillRect @x, @y, @width, @height

# -------------------------------------------------
class ImageShape extends Shape
	constructor : (@canvasContext, @x, @y, @width, @height, @src, @angle) ->
    super(@canvasContext, @x, @y)
		imgObj = new Image
	  imgObj.src = @src
    
  draw: ->
    @canvasContext.save
    @canvasContext.rotate @angle * Math.PI  / 180
    @canvasContext.drawImage @imgObj, @x, @y, @width, @height
    @canvasContext.restore