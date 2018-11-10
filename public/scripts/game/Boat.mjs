export default class Pirate {
	constructor(card) {
	  	if (card === undefined) {
			this.card = 0;
	  	}
	  	this.card = card;
	}

	move(card) {
	  	this.card = card;
	}
	
	getCard() {
	  	return this.card;
	}
	
	setCard(card) {
	  	this.card = card;
	}
}