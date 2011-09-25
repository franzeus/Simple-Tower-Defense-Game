class Game
  constructor: ->
    @FPS = 50
    @canvas = document.getElementById("canvas")
    @buffer = document.getElementById("buffer-canvas")
    @buffer.width = @canvas.width
    @buffer.height = @canvas.height
    @context = @canvas.getContext("2d")
    @_canvasContext = @buffer.getContext("2d")
    @HEIGHT = @canvas.height
    @WIDTH = @canvas.width
    $("#canvas").mousedown $.proxy(@clickEvent, this)
    $(".createTowerButton").click $.proxy(@initAddTower, this)
    $(".startGameButton").click $.proxy(@start, this)
    $(document).keydown $.proxy(@keyEvents, this)
    @drawNewTower = false    
    @newTowerType
    @towerShapeTemplate = null
    @activeUnit = null
    @start()

   # ----------------------------
  start: ->
    that = this
    @base = null
    @towers = []
    @enemies = []
    @player = new Player(1, 1200)

    @base = new Base(@_canvasContext, @WIDTH, @HEIGHT)
    
    @interval = window.setInterval(->
      that.draw()
    , 1000 / @FPS)
    @spawnInterval = window.setInterval(->
      that.createEnemy()
    , 4000)
    # ----------------------------
  draw: ->    
    that = this
    @clearCanvas()
    @base.draw()
    @towers.forEach (tower) ->
      if tower.lives > 0
        tower.draw()
        tower.bullets.forEach (bullet) ->
          bullet.draw() if that.isColliding(bullet.bulletCollisionShape, tower.rangeCollisionShape) and bullet.isVisible

    @enemies.forEach (enemy) ->      
      enemy.draw()
    
    @update()
      
    @towerShapeTemplate.draw() if @drawNewTower
      
    @context.drawImage @buffer, 0, 0
    
  # ----------------------------
  update: ->    
    @stop() if @base.lives <= 0
    @checkCollision()    
    
  # ----------------------------
  clearCanvas: ->
    @canvas.width = @WIDTH
    @_canvasContext.clearRect 0, 0, @WIDTH, @HEIGHT
    
  # ----------------------------
  stop: ->
    clearInterval @interval
    clearInterval @spawnInterval
    @interval = 0    

  # ----------------------------
  checkCollision: ->
    base = @base
    towers = @towers
    that = this
    player = @player
    
    @enemies.forEach (enemy) ->
     
      if enemy.isVisible
        
        if that.isColliding(enemy.enemyShape, base)
          
          enemy.remove()
          base.setDamage()
                            
        towers.forEach (tower) ->
          
          if tower.lives > 0        
            tower.bullets.forEach (bullet) ->
              
              if bullet.isVisible                  
                if that.isColliding(bullet.bulletCollisionShape, enemy.enemyShape)
                  enemy.decreaseLive tower.bulletPower
                  player.addMoney enemy.money  if enemy.lives <= 0
                  bullet.remove()              
                
            if that.isColliding(enemy.enemyShape, tower.collisionShape)
              enemy.remove()
              tower.setDamage()
              
            tower.shoot enemy.enemyShape.x, enemy.enemyShape.y if that.isColliding(enemy.enemyShape, tower.rangeCollisionShape)

    # ----------------------------
  clickEvent: (e) ->
    x = @getMousePosition(e)[0]
    y = @getMousePosition(e)[1]
    
    @towers.forEach (tower) ->
      tower.clickEvent()  if x >= tower.collisionShape.x and x <= (tower.collisionShape.x + tower.collisionShape.width) and y >= tower.collisionShape.y and y <= tower.collisionShape.y + tower.collisionShape.height

    @enemies.forEach (enemy) ->
      enemy.clickEvent()  if x >= enemy.enemyShape.x and x <= (enemy.enemyShape.x + enemy.enemyShape.width) and y >= enemy.enemyShape.y and y <= enemy.enemyShape.y + enemy.enemyShape.height
  
  # ----------------------------
  keyEvents: (e) ->
    switch e.keyCode
      when (82)
        @toggleTowerRanges()
    
  # ----------------------------
  createEnemy: ->
    plusMinus = @getRandomNumber(0, 3)
    if plusMinus == 0
      randomX = @getRandomNumber(0, @WIDTH) - @WIDTH
      randomY = @getRandomNumber(0, @HEIGHT) - @HEIGHT
    else if plusMinus == 1
      randomX = @getRandomNumber(0, @WIDTH) + @WIDTH
      randomY = @getRandomNumber(0, @HEIGHT) - @HEIGHT
    else if plusMinus == 2
      randomX = @getRandomNumber(0, @WIDTH) - @WIDTH
      randomY = @getRandomNumber(0, @HEIGHT) + @HEIGHT
    else
      randomX = @getRandomNumber(0, @WIDTH) + @WIDTH
      randomY = @getRandomNumber(0, @HEIGHT) + @HEIGHT
    
    @enemies.push new Enemy(@_canvasContext, randomX, randomY, @base.x + (@base.width / 2), @base.y + (@base.height / 2))
    
  # ----------------------------
  initAddTower: (e) ->
    return false  if @player.money - 100 < 0
      
    @newTowerType = e.currentTarget.id
    @drawNewTower = true

    @towerShapeTemplate = new Circle(@_canvasContext, e.pageX, e.pageY, 15, "rgba(17, 17, 17, 0.8)")
    $("#canvas").mousemove $.proxy(@bindTowerToMouse, this)
    $("#canvas").mousedown $.proxy(@createTower, this)
  
  # ----------------------------
  bindTowerToMouse: (e) ->
    if @drawNewTower
      @towerShapeTemplate.x = @getMousePosition(e)[0]
      @towerShapeTemplate.y = @getMousePosition(e)[1]
  
  # ----------------------------
  createTower: (e) ->

    newTowerObj = null;

    if @newTowerType == "long"
      newTowerObj = new TowerLong(@_canvasContext, @getMousePosition(e)[0], @getMousePosition(e)[1])
    else if @newTowerType == "heavy"
      newTowerObj = new TowerHeavy(@_canvasContext, @getMousePosition(e)[0], @getMousePosition(e)[1])
    else
      newTowerObj = new TowerNormal(@_canvasContext, @getMousePosition(e)[0], @getMousePosition(e)[1])

    @towers.push newTowerObj
    @player.reduceMoney newTowerObj.costs
    e.stopPropagation()
    @drawNewTower = false
    
    $("#canvas").unbind "mousemove", @createTower
    $("#canvas").unbind "mousedown", @createTower
  
  # ----------------------------
  toggleTowerRanges: ->
    show = not @isDisplayRange
    @towers.forEach (tower) ->
      tower.isDisplayRange = show

    @isDisplayRange = not @isDisplayRange

  # ----------------------------
  getRandomNumber: (min, max) ->
    return (-1)  if min > max
    return (min)  if min == max
    min + parseInt(Math.random() * (max - min + 1))
  
  # ----------------------------
  getMousePosition: (e) ->
    if e.pageX or e.pageY
      x = e.pageX
      y = e.pageY
    else
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop

    x -= $("canvas").offset().left
    y -= $("canvas").offset().top
    return [ x, y ]
  
  # ----------------------------
  isColliding: (obj1, obj2) ->
    return true  if obj1.x > obj2.x and obj1.x < (obj2.x + obj2.width) and obj1.y > obj2.y and obj1.y < (obj2.y + obj2.height)
    false