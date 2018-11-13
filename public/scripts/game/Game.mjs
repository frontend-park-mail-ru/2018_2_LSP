import MapBuilder from '/scripts/game/MapBuilder.mjs';
import CardBuilder from '/scripts/game/CardBuilder.mjs';
import Player from '/scripts/game/Player.mjs';
import UI from '/scripts/game/UI.mjs';


let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

const distribution = [[CARDTYPES.DEFAULT, 17], [CARDTYPES.GOLD, 6], [CARDTYPES.KILL, 2]];

function playerClick() {
	window.game.playerClick(this.id);
}

function flipCard() {
	if (window.game.flipCard(this.id)) {
    	this.classList.add('flip');
  	}
}

export default class Game {
    constructor(mapSize, playersCount, pirateCount) {
		this.map = MapBuilder.generateMap(distribution);

		this.currentPlayer = 0;
		this.playersCardId = [0, -1, -2];
		this.playersCount = playersCount;

		this.scores = [0, 0, 0];
		this.timeOut = this.startTimer();
		this.totalGoldCount = this.map.getTotalGoldCount();
		this.currentSelectedPirate = -1; // TODO убрать

		this.hovered = false;

		this.players = Array(playersCount);
		for(let i = 0; i < playersCount; i++) {
			this.players[i] = new Player();
			this.players[i].addPirates(pirateCount, -i - 1);
		}

		// оптимизация через Ивент Басс
		for(let i = 1; i <= mapSize*mapSize; ++i) {
			UI.setEventListener('click', "gamecard-" + i, flipCard);
		}
	
		for (let i = 0; i < this.players.length; i++) {
			let ship = UI.getAreaData("ship-" + i);
			for (let j = 0; j < this.players[i].getPirates().length; j++) {
				UI.placeDiv("player-" + i + "-" + j, ship[0], ship[1]);
				UI.setEventListener('click', "player-" + i + "-" + j, playerClick);
			}
		}
    }
  
    checkForWin() {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].getScore() > this.totalGoldCount / 2) {
			  	return true;
			}
		}
		return false;
    }
  
    startTimer() {
		return window.setTimeout(function() {
			this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
			this.hovered = false;
			UI.resetOpacity();
			alert("Время вашего хода истекло");
		}, 30000);
    }
  
    playerClick(id) {
		if (extractFirstNumber(id) != this.currentPlayer) {
			return;
	  	}
	
	  	if (!this.hovered) {
			this.hovered = true;
			UI.setLowOpacity();
			console.log(id);
			let pirateID = extractAllNumbers(id)[1];
			console.log(pirateID);
			let currentCard = this.players[this.currentPlayer].getPirate(pirateID).getCard();
			console.log(currentCard);
			let moveableCards = this.map.getMoveableCards(currentCard);
			console.log(moveableCards);
			moveableCards.forEach(function(id) {
				console.log(id);
				document.getElementById("gamecard-" + id).style.opacity = 1;
			});
	
			this.currentSelectedPirate = pirateID; // TODO убрать
	  	} 
		else {
			this.hovered = false;
			UI.resetOpacity();
		}
    }
  
    flipCard(id) {
		if (!this.hovered) {
			return false;
		}
		let cardID = parseInt(id.match(/\d+/)[0]);
		let pirateID = this.currentSelectedPirate; // TODO убрать
		let currentCard = this.players[this.currentPlayer].getPirate(pirateID).getCard();
		let moveableCards = this.map.getMoveableCards(currentCard);
		if (moveableCards.indexOf(cardID) == -1) {
			return false;
		}
	
		window.clearTimeout(this.timeOut);
	
		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getPirates().length; j++) {
				if (this.players[i].getPirates()[j].getCard() == cardID) {
					let cardData = UI.getAreaData("ship-" + i);
					UI.placeDiv("player-" + i + "-" + this.currentSelectedPirate, cardData[0], cardData[1]);
					this.players[i].getPirates()[j].setCard(-i);
				}
			}
		}
	
		let cardData = UI.getAreaData("gamecard-" + cardID);
	  	UI.placeDiv("player-" + this.currentPlayer + "-" + this.currentSelectedPirate, cardData[0], cardData[1]);
	  	this.players[this.currentPlayer].getPirate(this.currentSelectedPirate).setCard(cardID);
	
		let cardType = this.map.getCardType(cardID);
		let cardObject = CardBuilder.build(cardType);
		cardObject.apply(this);

		if (this.checkForWin()) {
			if (this.done === undefined) {
			  	alert("Игрок " + this.currentPlayer + " выиграл! Вы можете продолжать игру (тестовый режим).");
			 	this.done = true;
			}
		}
	
		this.currentPlayer = (game.currentPlayer + 1) % game.players.length;
	
		switch (cardType) {
			case CARDTYPES.GOLD:
				document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'img/gold.png';
				break;
			case CARDTYPES.KILL:
				document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'img/kill.png';
				break;
			default:
				document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'img/water.png';
				break;
		}
	
		UI.resetOpacity();
	
		this.hovered = false;
		this.timeOut = this.startTimer();
		return true;
    } 
}

// function extractNumber(n) {
// 	return parseInt(n.match(/\d+/)[0]);
// }

function extractFirstNumber(n) {
	return n.match(/\d+/g).map(Number)[0];
}

function extractAllNumbers(n) {
	console.log(n.match(/\d+/g).map(Number));
	return n.match(/\d+/g).map(Number);
}

// export class UI {
// 	static resetOpacity(document) {
// 		for(let i = 1; i <= game.map.size * game.map.size; ++i) {
// 			document.getElementById("gamecard-" + i).style.opacity = 1;
// 		}
// 	}

// 	static setLowOpacity(document) {
// 		for(let i = 1; i <= game.map.size * game.map.size; ++i) {
// 			document.getElementById("gamecard-" + i).style.opacity = 0.7;
// 		}
// 	}

// 	static placeDiv(id, x_pos, y_pos) {
// 		let d = document.getElementById(id);
// 		d.style.left = x_pos+'px';
// 		d.style.top = y_pos+'px';
// 	}

// 	static getAreaData(id) {
// 		let area = document.getElementById(id);
// 		let rect = area.getBoundingClientRect();
// 		return [rect.left, rect.top, area.offsetWidth, area.offsetHeight]
// 	}  

// 	static setEventListener(document, type, id, listener) {
// 		console.log(document)
// 		document.getElementById(id).addEventListener(type, listener)
// 	}
// }