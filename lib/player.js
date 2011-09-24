var Player;
Player = (function() {
  function Player(id, money) {
    this.id = id;
    this.money = money != null ? money : 0;
    this.moneyHtmlObject = $("#money");
    this.addMoney(this.money);
  }
  Player.prototype.addMoney = function(_value) {
    this.money += _value;
    return this.moneyHtmlObject.val(this.money);
  };
  Player.prototype.reduceMoney = function(_value) {
    if (this.money - _value < 0) {
      return false;
    }
    this.money -= _value;
    return this.moneyHtmlObject.val(this.money);
  };
  return Player;
})();