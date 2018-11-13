export class GoldCard {
	constructor() {}
	
	apply(game) {
		let cardID = game.players[game.currentPlayer].getPirate(game.currentSelectedPirate).getCard();
		if (game.map.getGoldOnTitle(cardID) > 0) {
		  	game.map.decreaseGold(cardID);
		  	game.players[game.currentPlayer].incScore();
		  	alert("Вы нашли сундук! Получите пироженку в подарок. Теперь у вас " + game.players[game.currentPlayer].getScore() + " пирожен(?)");
		}
	}
}
  
export class EmptyCard {
	constructor() {}
	
	apply(game) {}
}
  
export class KillCard {
	constructor() {}
	
	apply(game) {
		let cardData = UI.getAreaData("ship-" + game.currentPlayer);
		UI.placeDiv("player-" + game.currentPlayer + "-" + game.currentSelectedPirate, cardData[0], cardData[1]);
		game.players[game.currentPlayer].getPirate(game.currentSelectedPirate).setCard(-game.currentPlayer);
	}
}