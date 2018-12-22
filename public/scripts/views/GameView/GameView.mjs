import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';
import gameMap from './gameMap.pug';
import gamePlayers from './gamePlayers.pug';
import Multiplayer from '../../game/controller/Multiplayer.mjs';
import Singleplayer from '../../game/controller/Singleplayer.mjs';

import './GameView.scss';

export default class GameView extends BaseView {
	constructor(mode = 'multiplayer', mapSize = 5, players = [], playersCount, unitsCount = 1, stepTime = 60, myNumber = 0, ws) {
		super();
		this.ws = ws;
		this._myNumber = myNumber;
		this._mapSize = +mapSize;
		this._players = players;
		this._playersCount = +playersCount;
		this._unitsCount = +unitsCount;
		this._stepTime = stepTime;
		this._mode = mode;
	}

	render() {
		const mainSection = document.getElementsByClassName('main-section');
		mainSection[0].insertAdjacentHTML('beforeend', gameMap({'size': this._mapSize, 'players': this._playersCount, 'units': this._unitsCount}));
		const gameSection = document.getElementsByClassName('game');
		gameSection[0].insertAdjacentHTML('beforeend', gamePlayers({'names': this._players}));

		const controller = (this._mode === 'multiplayer') ? new Multiplayer(this._players, this._myNumber, this.ws) : new Singleplayer(this._players);
		if (this._mode === 'singleplayer') {
			this._myNumber = -1;
		}
		this.game = new Game(controller, this._mapSize, this._playersCount, this._unitsCount, this._myNumber);
	}
}