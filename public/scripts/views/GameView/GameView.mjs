import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';
import gameMap from './gameMap.pug';
import gamePlayers from './gamePlayers.pug';
import gameTimer from './gameTimer.pug';
import './GameView.scss';

export default class GameView extends BaseView {
	constructor(mode = 'multiplayer', mapSize = 5, playersCount = 2, unitsCount = 2){
		super();
		this._mapSize = mapSize;
		this._playersCount = playersCount;
		this._unitsCount = unitsCount;
		this._mode = mode;
	}

	render() {
		const gameSection = document.getElementsByClassName('game');
		if (gameSection.length != 0) {
			gameSection[0].insertAdjacentHTML('beforeend', gameMap({'size': this._mapSize, 'players': this._playersCount, 'units': this._unitsCount}));
			gameSection[0].insertAdjacentHTML('beforeend', gamePlayers({'names': ['1', '2']}));
			// gameSection[0].insertAdjacentHTML('beforeend', gameTimer());
		} else {
			const application = document.getElementById('application');			
			application.insertAdjacentHTML('beforeend', gameMap({'size': this._mapSize, 'players': this._playersCount, 'units': this._unitsCount}));
			application.insertAdjacentHTML('beforeend', gamePlayers({'names': ['1', '2']}));
			// application.insertAdjacentHTML('beforeend', gameTimer());
		}       

		// const mapSize = 5;
		// const playersCount = 2;
		// const unitsCount = 2;

		window.game = new Game(this._mapSize, this._playersCount, this._unitsCount, this._mode);
	}
}


      

    




  