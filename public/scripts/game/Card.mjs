import UI from '/scripts/game/UI.mjs';

class Card {
	constructor() {}

	apply(game) {}
}

export class EmptyCard extends Card {
	constructor() {
		super();
	}
	
	apply(game) {}
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
		  	alert('Вы нашли сундук! Получите пироженку в подарок. Теперь у вас ' + game.players[game.currentPlayer].getScore() + ' пирожен(?)');
		}
	}
}
  
export class KillCard extends Card {
	constructor() {
		super();
	}
	
	apply(game) {
		UI.moveToCard('pirate-' + game.currentPlayer + '-' + game.currentSelectedPirate, 'base-' + game.currentPlayer);
		game.players[game.currentPlayer].getPirate(game.currentSelectedPirate).setCard('base-' + game.currentPlayer);
	}
}