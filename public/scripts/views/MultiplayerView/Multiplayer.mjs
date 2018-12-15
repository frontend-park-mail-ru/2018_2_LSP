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
import GameView from '../GameView/GameView.mjs';
import Router from '../../modules/Router.mjs';
import './Multiplayer.scss';

// export let wsGame = undefined;

Array.prototype.remove = function(value) {
	const idx = this.indexOf(value);
	if (idx != -1) {
		return this.splice(idx, 1);
	}
	return false;
};

export default class Multiplayer extends BaseView {
	constructor(){
		super('Мультиплеер');
		this.ws = undefined;
		this._players = [];
	}

	render() {
		// форма создания комнаты
		this.pageContent.insertAdjacentHTML('beforeend', addForm());
		const addRoomForm = document.getElementById('add_room');
		addRoomForm.setAttribute('hidden', true);

		addRoomForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const formdata = {};
			const elements = addRoomForm.elements;
			for (let element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}
			this._gameName = formdata['name'];
			this._mapSize = formdata['size'];
			this._playersCount = formdata['players'];
			this._time = formdata['time'];

			addRoomForm.setAttribute('hidden', true);

			this.roomBlock();
			this.listenRoomEvents();
			this.ws = new Socket(`/games/create?title=${this._gameName}&players=${this._playersCount}`, 'game');	
		});

		// пагинатор комнат
		const items = {'Игра': 'hash', 'Кол-во игроков': 'players'};
		const paginator = new Paginator(function(page) {
			Games.list((err, response) => {
				if (!err) {
					if (response.length === 0) {
						Bus.emit('empty-page', response);
					} else {
						Bus.emit('paginator-update', response['gamerooms']);
					}
				} else {
					Router.open('/signin');
				}
			}, {page: page});
		});

		// кнопка создания новой комнаты
		const addRoomButton = new Item('+', function() {
			const form = document.getElementById('add_room');
			if (form.hidden === true) {
				form.removeAttribute('hidden', true);
			} else {
				addRoomForm.setAttribute('hidden', true);
			}
		});

		// таблица комнат
		const gamesBoard = new Table(items, ['leaders-table'], [addRoomButton, paginator], (event) => {
			let target = event.target;
			while (target.tagName !== 'tbody') {
				if (target.classList.contains('leaders-table__row')) {
					const gameHash = target.getElementsByClassName('leaders-table__cell')[0].textContent;
					
					//======
					this._playersCount = 2;
					this._mapSize = 5;
					this._time = 60;
					//======

					this.roomBlock();
					this.listenRoomEvents();
					this.ws = new Socket(`/games/connect?room=${gameHash}`, 'game');
					return;
				}
				target = target.parentNode;
			}
			// console.log(event.target);
			// 		
		});


		// const startButton = new Item('Готов', () => {

		// });

		// startButton.event('click', function() {
		// 	console.log(window.wsGame);
		// 	const data = {'action': 'ready', 'params': {}};
		// 	console.log(data);
		// 	Bus.emit('', data);
		// });

		
		this.pageContent.appendChild(gamesBoard.getElement());

		// this.pageContent.appendChild(players.getElement());
		// this.pageContent.appendChild(startButton.getElement());
	}

	listenRoomEvents() {
		Bus.on('sw-game-message', (data) => {
			data = JSON.parse(data);
			switch (data['Type']) {
			case 'players':
				if (this._players.indexOf(data['User']['Username']) === -1) {
					this._players.push(data['User']['Username']);
				}
				this.playersBlock();
				break;
			case 'leave':
				this._players.remove(data['User']['Username']);
				this.playersBlock();
				break;
			case 'start':
				this.startGame();
			}
		});
	}

	startGame() {
		let units = 1;
		switch (this._mapSize) {
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
		const mainSection = document.getElementsByClassName('main-section')[0];
		mainSection.innerHTML = '';
		const gameView = new GameView(this.ws, 'multiplayer', this._mapSize, this._players, this._playersCount, units, this._time);
		gameView.render();
	}

	settingWindow() {

	}

	playersBlock() {
		this.roomPlayers.clear();
		for (let i = 0; i < this._playersCount; i++) {
			this.roomPlayers.getElement().insertAdjacentHTML('beforeend', playersBoard({'number': i, 'name': this._players[i]}));
		}
	}

	roomBlock() {
		this.roomPlayers = new Block('div');
		this.pageContent.appendChild(this.roomPlayers.getElement());
		this.playersBlock();
		const readyButton = new Item('Готов', () => {
			this.ws.send(JSON.stringify({'action': 'ready', 'params': {}}));
		});
		this.pageContent.appendChild(readyButton.getElement());
	}
}