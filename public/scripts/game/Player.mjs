import Pirate from './Pirate.mjs';

export default class Player {
	constructor() {
		this.pirates = [];
		this.score = 0;
	}
  
	incScore() {
		this.score++;
	}
  
	getScore() {
		return this.score;
	}
  
	addPirate(card) {
		this.pirates.push(new Pirate(card));
	}
  
	addPirates(n, card) {
		for(let i = 0; i < n; i++) {
			this.pirates.push(new Pirate(card));
		}
	}
  
	movePirate(i, card) {
		this.pirates[i].move(card);
	}
  
	getPirates() {
		return this.pirates;
	}
  
	getPirate(i) {
		return this.pirates[i];
	}
}