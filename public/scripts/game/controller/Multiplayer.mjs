import MapBuilder from '../MapBuilder.mjs';
import gameBus from '../gameBus.mjs';
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
	constructor(players, ws) {
		super(players);
		this.ws = ws;

		this.listenGameEvents();
	}

	createMap() {
		return MapBuilder.generateEmptyMap(5);	// получение карты в виде матрицы        
	}

	listenGameEvents() {
		gameBus.on('game-pass-step', (data) => {
			data = JSON.stringify({action: 'move', params: data});
			this.ws.send(data);
		});

		gameBus.on('game-ready', () => {
			gameBus.emit('game-step', 0);
		});
	}
}