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

export let wsGame = undefined;

export default class Room extends BaseView {
	constructor(){
		super('Мультиплеер');
		// this.ws = undefined;
	}

	render() {
		const items = {'Игра': 'hash', 'Кол-во игроков': 'players'};
		const paginator = new Paginator(function(page) {
			Games.list((err, response) => {
				if (!err) {
					if (response.length === 0) {
						Bus.emit('empty-page', response);
					} else {
						Bus.emit('paginator-update', response['gamerooms']);
					}
				}
			}, {page: page});
		});
		const addRoomButton = new Item('+', function(page) {
			window.wsGame = new Socket('/games/create', 'game');
			// Games.create((err, response) => {
			// 	if (!err) {
			// 		if (response.length === 0) {
			// 			Bus.emit('empty-page', response);
			// 		} else {
			// 			Bus.emit('paginator-update', response);
			// 		}
			// 	}
			// }, {page: page});
		});
		const onclick = function() {
			const gameHash = this.getElementsByTagName('th')[0].textContent;
			window.wsGame = new Socket(`/games/connect?room=${gameHash}`, 'game');			
		};
		const gamesBoard = new Table(items, ['leaders-table'], [addRoomButton, paginator], onclick);

		this.pageContent.insertAdjacentHTML('beforeend', addForm());
		const addRoomForm =document.getElementById('add_room');
		addRoomForm.setAttribute('hidden', true);



		const players = new Block('div');
		players.getElement().insertAdjacentHTML('beforeend', playersBoard());

		const startButton = new Button('singleplayer', 'Готов');

		startButton.event('click', function() {
			console.log(window.wsGame);
			const data = {'action': 'ready', 'params': {}};
			console.log(data);
			Bus.emit('', data);
		});

		
		this.pageContent.appendChild(gamesBoard.getElement());

		this.pageContent.appendChild(players.getElement());
		this.pageContent.appendChild(startButton.getElement());
	}
}