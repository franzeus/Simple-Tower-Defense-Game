# Base Class
class Shape 
	constructor: (@canvasContext, @x, @y, @color) ->

# -------------------------------------------------
class Circle extends Shape
	constructor : (@canvasContext, @x, @y, @radius, @color) ->
    super(@canvasContext, @x, @y, @color)

	draw: ->
	  @canvasContext.beginPath()
	  @canvasContext.fillStyle = @color
	  @canvasContext.arc @x, @y, @radius, 0, Math.PI * 2, true
	  @canvasContext.fill()

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
    @imgObj = new Image
    @imgObj.src = @src
    super(@canvasContext, @x, @y)

  draw: ->
    @canvasContext.save
    @canvasContext.rotate @angle * Math.PI  / 180
    @canvasContext.drawImage @imgObj, @x, @y, @width, @height
    @canvasContext.restore

# -------------------------------------------------
class ImageSprite extends Shape
  constructor : (@canvasContext, @x, @y, @width, @height, @src, @frames) ->
    @imgObj = new Image
    @imgObj.src = @src
    @actualFrame = 0
    @interval = 0
    super(@canvasContext, @x, @y)

  draw: ->
    if @interval == @frames - 1
      if @actualFrame == @frames
        @actualFrame = 0
      else  
        @actualFrame++;
      @interval = 0;
      
    @interval++;
    try
      @canvasContext.drawImage @imgObj, @width * @actualFrame ,0 ,@width, @height, @x, @y, @width, @height);
    catch error
      print error    