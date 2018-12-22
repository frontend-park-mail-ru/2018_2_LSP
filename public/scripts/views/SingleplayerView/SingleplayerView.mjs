import BaseView from '../BaseView/BaseView.mjs';
import addForm from './addForm.pug';
import GameView from '../GameView/GameView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './Singleplayer.scss';

const SMALL_MAP = 5;
const MIDDLE_MAP = 7;
const BIG_MAP = 9;

export default class Singleplayer extends BaseView {
	constructor(){
		super('Одиночная игра');
	}

	render() {
		const singleplayerDiv = new Block('div', ['game-settings']);
		singleplayerDiv.getElement().insertAdjacentHTML('beforeend', addForm());
		this.pageContent.appendChild(singleplayerDiv.getElement());
		const addRoomForm = document.getElementById('add_room');

		addRoomForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const formdata = {};
			const elements = addRoomForm.elements;
			for (let element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}
			this.startGame(+formdata['size'], +formdata['players'], +formdata['time']);
		});
	}

	startGame(size, playersCount, time) {
		let units = 1;
		switch (this._mapSize) {
		case SMALL_MAP:
			units = 1;
			break;
		case MIDDLE_MAP:
			units = 2;
			break;
		case BIG_MAP:
			units = 3;
			break;
		}
		const players = [];
		for (let i = 0; i < playersCount; i++) {
			players.push(`Игрок ${i+1}`);
		}
		const mainSection = document.getElementsByClassName('main-section')[0];
		mainSection.innerHTML = '';
		const gameView = new GameView('singleplayer', size, players, playersCount, units, time);
		gameView.render();
	}
}