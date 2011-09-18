Player = function(_id, _money) {
	var that = this;
	this.money = 0;
	this.id = _id;

	this.addMoney(_money);
};
//
Player.prototype.addMoney = function(_value) {
	this.money += _value;
	$("#money").val(this.money);
}
//
Player.prototype.reduceMoney = function(_value) {
	if(this.money - _value < 0) return false;
	this.money -= _value;
	$("#money").val(this.money);
}