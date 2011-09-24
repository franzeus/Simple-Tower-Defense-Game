class Base 
  constructor : (@canvasContext, _canvasW, _canvasH) ->
    @height = 40
    @width = 40
    @x = (_canvasW / 2) - (@width / 2)
    @y = (_canvasH / 2) - (@height / 2)
    @color = "#FFD800"
    @lives = 1

    @baseShape = new Rectangle(@canvasContext, @x, @y, @width, @height, @color)
    $("#baseLive").val @lives

  draw: ->
    @baseShape.draw()

  setDamage: ->
    @lives--
    $("#baseLive").val @lives