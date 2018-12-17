import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';
import gameMap from './gameMap.pug';
import gamePlayers from './gamePlayers.pug';
import Multiplayer from '../../game/controller/Multiplayer.mjs';
import Singleplayer from '../../game/controller/Singleplayer.mjs';

import './GameView.scss';

export default class GameView extends BaseView {
	constructor(mode = 'multiplayer', mapSize = 5, players = [], playersCount, unitsCount = 1, stepTime = 60, ws) {
		super();
		this.ws = ws;
		this._mapSize = mapSize;
		this._players = players;
		this._playersCount = playersCount;
		this._unitsCount = unitsCount;
		this._stepTime = stepTime;
		this._mode = mode;
	}

	render() {
		const gameSection = document.getElementsByClassName('game');
		if (gameSection.length != 0) {
			gameSection[0].insertAdjacentHTML('beforeend', gameMap({'size': this._mapSize, 'players': this._playersCount, 'units': this._unitsCount}));
			gameSection[0].insertAdjacentHTML('beforeend', gamePlayers({'names': this._players}));
			// gameSection[0].insertAdjacentHTML('beforeend', gameTimer());
		} else {
			const application = document.getElementById('application');			
			application.insertAdjacentHTML('beforeend', gameMap({'size': this._mapSize, 'players': this._playersCount, 'units': this._unitsCount}));
			application.insertAdjacentHTML('beforeend', gamePlayers({'names': this._players}));
			// application.insertAdjacentHTML('beforeend', gameTimer());
		}

		const controller = (this._mode === 'multiplayer') ? new Multiplayer(this._players, this.ws) : new Singleplayer(this._players);
		window.game = new Game(controller, this._mapSize, this._playersCount, this._unitsCount);
	}
}


      

    




  