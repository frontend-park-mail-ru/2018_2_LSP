import BaseView from '../BaseView/BaseView.mjs';
import Games from '../../services/games.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Item from '../../blocks/Item/Item.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Bus from '../../modules/eventBus.mjs';
import addForm from './addForm.pug';
import playersBoard from './playersBoard.pug';
import Socket from '../../modules/websocket.mjs';
import './Room.scss';

export default class Leaders extends BaseView {
	constructor(){
		super('Мультиплеер');
	}

	render() {
		// const ws = new Socket();

		const items = {'Игра': 'username', 'Кол-во игроков': 'players'};
		const paginator = new Paginator(function(page) {
			Games.list((err, response) => {
				if (!err) {
					if (response.length === 0) {
						Bus.emit('empty-page', response);
					} else {
						Bus.emit('paginator-update', response);
					}
				}
			}, {page: page});
		});
		const addRoomButton = new Item('+', function(page) {
			Games.create((err, response) => {
				if (!err) {
					if (response.length === 0) {
						Bus.emit('empty-page', response);
					} else {
						Bus.emit('paginator-update', response);
					}
				}
			}, {page: page});
		});
		const gamesBoard = new Table(items, ['leaders-table'], [addRoomButton, paginator]);

		this.pageContent.insertAdjacentHTML('beforeend', addForm());
		const addRoomForm =document.getElementById('add_room');
		addRoomForm.setAttribute('hidden', true);



		const players = new Block('div');
		players.getElement().insertAdjacentHTML('beforeend', playersBoard());

		const startButton = new Button('singleplayer', 'Начать игру');

		
		this.pageContent.appendChild(gamesBoard.getElement());

		this.pageContent.appendChild(players.getElement());
		this.pageContent.appendChild(startButton.getElement());
	}
}