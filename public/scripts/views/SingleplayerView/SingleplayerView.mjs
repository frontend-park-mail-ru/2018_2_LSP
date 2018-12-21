import BaseView from '../BaseView/BaseView.mjs';
import addForm from './addForm.pug';
import GameView from '../GameView/GameView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './Singleplayer.scss';

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
		switch (size) {
		case 5:
			units = 1;
			break;
		case 7:
			units = 2;
			break;
		case 9:
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