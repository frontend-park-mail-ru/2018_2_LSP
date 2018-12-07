class Card {
	constructor() {}

	apply() {}
}

export class EmptyCard extends Card {
	constructor() {
		super();
	}
	
	apply() {}
}

export class GoldCard extends Card {
	constructor() {
		super();
	}
	
	apply(game) {
		const id = game.players[game.currentPlayer].getPirate(game.currentSelectedPirate).getCard();
		const cardID = game.getCardNumber(id);
		if (game.map.getGoldOnTitle(cardID) > 0) {
			game.map.decreaseGold(cardID);
			game.players[game.currentPlayer].incScore();
			alert('Вы нашли сундук! Теперь у вас ' + game.players[game.currentPlayer].getScore() + ' золота!');
		}
	}
}
  
export class KillCard extends Card {
	constructor() {
		super();
	}
	
	apply(game) {
		game.UI.moveToCard('pirate-' + game.currentPlayer + '-' + game.currentSelectedPirate, 'base-square' + game.currentPlayer);
		game.players[game.currentPlayer].getPirate(game.currentSelectedPirate).setCard('base-square' + game.currentPlayer);
	}
}