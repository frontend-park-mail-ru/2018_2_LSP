import MapBuilder from '../MapBuilder.mjs';
import gameBus from '../gameBus.mjs';
import Controller from './Controller.mjs';

let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

const distribution = [[CARDTYPES.DEFAULT, 17], [CARDTYPES.GOLD, 6], [CARDTYPES.KILL, 2]];

/**
 * Главный класс игры
 * @module Game
 */
export default class Singleplayer extends Controller {
	/**
	 * Создание экземпляра игры
	 * @param {number} mapSize размерность карты
	 * @param {number} playersCount количество игроков (2 или 4)
	 * @param {number} pirateCount количество фишек на игрока
	 */
	constructor(players) {
		super(players);
		this.playersCount = players.length;
		this.currentPlayer = 0;

		this.listenGameEvents();
	}

	createMap() {
		this.map = MapBuilder.generateMap(distribution);
		return this.map;	// получение карты в виде матрицы
	}

	getCardType(cardID) {
		return this.map.getCardType(cardID);		
	}

	listenGameEvents() {
		gameBus.on('game-pass-step', () => {
			this.currentPlayer = (this.currentPlayer + 1) % this.playersCount;			
			gameBus.emit('game-step', this.currentPlayer);
		});

		gameBus.on('game-ready', () => {
			gameBus.emit('game-step', this.currentPlayer);
		});
	}
}