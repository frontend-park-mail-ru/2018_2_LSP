import BaseView from '../BaseView/BaseView.mjs';
import Games from '../../services/games.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Item from '../../blocks/Item/Item.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Bus from '../../modules/eventBus.mjs';
import addForm from './addForm.pug';
// import playersBoard from './playersBoard.pug';
import Socket from '../../modules/websocket.mjs';
import GameView from '../GameView/GameView.mjs';
// import './Singleplayer.scss';

// export let wsGame = undefined;

export default class Singleplayer extends BaseView {
	constructor(){
		super('Одиночная игра');
	}

	render() {
		this.pageContent.insertAdjacentHTML('beforeend', addForm());
		const addRoomForm = document.getElementById('add_room');

		addRoomForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const formdata = {};
			const elements = addRoomForm.elements;
			for (let element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}
			this.startGame(formdata['size'], formdata['players'], formdata['units'], formdata['time']);
		});
	}

	startGame(size, players, units, time) {
		const mainSection = document.getElementsByClassName('main-section')[0];
		mainSection.innerHTML = '';
		const gameView = new GameView('singleplayer', size, players, units);
		gameView.render();
	}
}