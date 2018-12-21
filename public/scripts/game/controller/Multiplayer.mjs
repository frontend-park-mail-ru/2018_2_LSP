import MapBuilder from '../MapBuilder.mjs';
import gameBus from '../gameBus.mjs';
import Bus from '../../modules/eventBus.mjs';
import Controller from './Controller.mjs';

/**
 * Главный класс игры
 * @module Game
 */
export default class Multiplayer extends Controller {
	/**
	 * Создание экземпляра игры
	 * @param {number} mapSize размерность карты
	 * @param {number} playersCount количество игроков (2 или 4)
	 * @param {number} pirateCount количество фишек на игрока
	 */
	constructor(players, myNumber, ws) {
		super(players);
		this.ws = ws;
		this.cardTypes = [];
		this.myNumber = myNumber;

		this.listenGameEvents();
	}

	createMap(size) {
		return MapBuilder.generateEmptyMap(size);	// получение карты в виде матрицы        
	}

	getCardType(cardID) {
		return this.cardTypes[cardID-1];
	}

	listenGameEvents() {
		gameBus.on('game-pass-step', (data) => {
			data = JSON.stringify({action: 'move', params: data});
			this.ws.send(data);
		});

		gameBus.on('game-ready', () => {
			gameBus.emit('game-step', 0);
		});

		Bus.on('sw-game-message', (data) => {
			data = JSON.parse(data);
			switch (data['Type']) {
			case 'movement':
				this.cardTypes[data['Data']['cardID']] = data['Data']['cardType'];
				data['Data']['cardID'] += 1;
				gameBus.emit('game-pirate-go', data['Data']);
				break;
			case 'expired':
				break;
			case 'nextplayer':
				gameBus.emit('game-step', data['Data']['playerID']);		
				break;
			}
		});
	}
}