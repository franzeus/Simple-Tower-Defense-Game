var Circle, ImageShape, Rectangle, Shape;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Shape = (function() {
  function Shape(canvasContext, x, y, color) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  return Shape;
})();
Circle = (function() {
  __extends(Circle, Shape);
  function Circle(canvasContext, x, y, radius, color) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    Circle.__super__.constructor.call(this, this.canvasContext, this.x, this.y, this.color);
  }
  Circle.prototype.draw = function() {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    return this.canvasContext.fill();
  };
  return Circle;
})();
Rectangle = (function() {
  __extends(Rectangle, Shape);
  function Rectangle(canvasContext, x, y, width, height, color) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    Rectangle.__super__.constructor.call(this, this.canvasContext, this.x, this.y, this.color);
  }
  Rectangle.prototype.draw = function() {
    this.canvasContext.fillStyle = this.color;
    return this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
  };
  return Rectangle;
})();
ImageShape = (function() {
  __extends(ImageShape, Shape);
  function ImageShape(canvasContext, x, y, width, height, src, angle) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
    this.angle = angle;
    this.imgObj = new Image;
    this.imgObj.src = this.src;
    ImageShape.__super__.constructor.call(this, this.canvasContext, this.x, this.y);
  }
  ImageShape.prototype.draw = function() {
    this.canvasContext.save;
    this.canvasContext.rotate(this.angle * Math.PI / 180);
    this.canvasContext.drawImage(this.imgObj, this.x, this.y, this.width, this.height);
    return this.canvasContext.restore;
  };
  return ImageShape;
})();