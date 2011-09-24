class Player 
	constructor : (@id, @money = 0) ->
		@moneyHtmlObject = $("#money");
		@addMoney @money

	addMoney: (_value) ->
		@money += _value;
		@moneyHtmlObject.val(@money);

	reduceMoney: (_value) ->
		return false if(@money - _value < 0) ;
		@money -= _value;
		@moneyHtmlObject.val(@money);