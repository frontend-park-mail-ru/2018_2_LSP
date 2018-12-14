import MapBuilder from './MapBuilder.mjs';
import CardBuilder from './CardBuilder.mjs';
import Player from './Player.mjs';
import UI from './UI.mjs';
// import Controlle
import Bus from './gameBus.mjs';
// import Controller from './controller/Controller.mjs';
import Multiplayer from './controller/Multiplayer.mjs';
import Singleplayer from './controller/Singleplayer.mjs';
import { TSMethodSignature } from 'babel-types';



let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

 
/**
 * Главный класс игры
 * @module Game
 */
export default class Game {
	/**
	 * Создание экземпляра игры
	 * @param {number} mapSize размерность карты
	 * @param {number} playersCount количество игроков (2 или 4)
	 * @param {number} pirateCount количество фишек на игрока
	 */
	constructor(mapSize, playersCount, pirateCount, mode = 'multiplayer') {
		this.gameController = (mode === 'multiplayer') ? new Multiplayer() : new Singleplayer();

		this.map = this.gameController.createMap();	// создание карты

		// this.me = ;
		this.currentPlayer = 0;
		this.playersCount = playersCount;
		
		this.timeOut = this.startTimer();
		this.totalGoldCount = this.map.getTotalGoldCount();
		this.currentSelectedPirate = -1; // TODO убрать ???

		this.hovered = false;	//???

		this.players = Array(playersCount);
		for(let i = 0; i < playersCount; i++) {
			this.players[i] = new Player();
			this.players[i].addPirates(pirateCount, 'base-square' + i);
		}

		this.UI = new UI(mapSize, this.timeOut, this.playersCount);

		// навешиваем событие переворота карточки
		for(let i = 1; i <= mapSize * mapSize; ++i) {
			this.UI.setEventListener('click', 'gamecard-' + i, function() {
				window.game.flipCard(this.id);
			});
		}
	
		// навешиваем событие выбора пирата
		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getPirates().length; j++) {
				const id = 'pirate-' + i + '-' + j;
				this.UI.setEventListener('click', id, function() {
					window.game.playerClick(this.id);
				});
			}
		}

		// Bus.on('toBase', (pirate) => {
		// 	console.log(pirate);
		// });
	}

	/**
	 * Проверка выиграша какого-либо игрока
	 */
	checkForWin() {
		this.players.forEach(player => {
			if (player.getScore() > this.totalGoldCount / 2) {
				return true;
			}
		});
		return false;
	}
  
	startTimer() {
		return window.setTimeout(function() {
			this.currentPlayer = (this.currentPlayer + 1) % this.playersCount;
			this.hovered = false;
			// this.UI.resetSelected();
			alert('Время вашего хода истекло');
		}, 30000);
	}

	/**
	 * Обработка нажатия на пирата
	 * @param {string} id id пирата на которого нажали
	 */
	playerClick(id) {
		if (this._getPlayerNumber(id) != this.currentPlayer) {
			return;
		}
		this.UI.resetSelected();
	
		if (!this.hovered) {
			this.hovered = true;
			this.UI.setLowOpacity();
			let pirateID = this._getPirateNumber(id);
			let currentCard = this.players[this.currentPlayer].getPirate(pirateID).getCard();
			const moveableCards = this.map.getMoveableCards(currentCard);
			this.UI.selectCards(moveableCards);
			this.currentSelectedPirate = pirateID; // TODO убрать
		} 
		else {
			this.hovered = false;
			this.UI.resetSelected();
			//=====================
			// выделение кораблей текущего игрока
			//=================
		}
	}

	/**
	 * Обработка нажатия на карточку
	 * @param {string} id id нажатой карточки
	 */
	flipCard(id) {
		if (!this.hovered) {
			return false;
		}
		const cardID = parseInt(this.getCardNumber(id));
		const currentCard = this.players[this.currentPlayer].getPirate(this.currentSelectedPirate).getCard();
		let moveableCards = this.map.getMoveableCards(currentCard);
		console.log(moveableCards);
		if (moveableCards.indexOf('square-' + this.getCardNumber(id)) == -1) {
			return false;
		}
	
		window.clearTimeout(this.timeOut);

		this.players[this.currentPlayer].getPirate(this.currentSelectedPirate).setCard('square-' + this.getCardNumber(id));

		const pirate = `pirate-${this.currentPlayer}-${this.currentSelectedPirate}`;
		this.UI.moveToCard(pirate, `square-${cardID}`);
		this.UI.resetSelected();
	
		const cardType = this.map.getCardType(cardID);
		const cardObject = CardBuilder.build(cardType);
		cardObject.apply(this);
	
		const card = document.getElementById(id);
		switch (cardType) {
		case CARDTYPES.GOLD:
			card.getElementsByTagName('img')[0].src = 'img/gold.png';
			break;
		case CARDTYPES.KILL:
			card.getElementsByTagName('img')[0].src = 'img/kill.png';
			break;
		default:
			card.getElementsByTagName('img')[0].src = 'img/water.png';
			break;
		}
		card.classList.add('flip');

		if (this.checkForWin()) {
			if (this.done === undefined) {
				alert('Игрок ' + this.currentPlayer + ' выиграл! Вы можете продолжать игру (тестовый режим).');
				this.done = true;
			}
		}

		//==================
		this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
		this.UI.changeCurrentPlayer(this.currentPlayer);
		const currentPiratesCards = [];
		const pirateList = this.players[this.currentPlayer].getPirates();
		pirateList.forEach((pirateOfPlayer) => {
			currentPiratesCards.push(pirateOfPlayer.getCard());
		});
		this.UI.selectCards(currentPiratesCards);
		
		this.hovered = false;
		this.timeOut = this.startTimer();
		return true;
	}
	
	_getPlayerNumber(id) {
		return id.match(/\d+/g).map(Number)[0];
	}
	
	_getPirateNumber(id) {
		return id.match(/\d+/g).map(Number)[1];
	}

	getCardNumber(id) {
		return id.match(/\d+/)[0];
	}
}