export default class Pirate {
	constructor(card = 'base') {
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