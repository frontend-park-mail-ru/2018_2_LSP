import BaseView from '../BaseView/BaseView.mjs';
import Games from '../../services/games.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Item from '../../blocks/Item/Item.mjs';
import Bus from '../../modules/eventBus.mjs';
import addForm from './addForm.pug';
import Users from '../../services/users.mjs';
import playersBoard from './playersBoard.pug';
import Socket from '../../modules/websocket.mjs';
import GameView from '../GameView/GameView.mjs';
import Router from '../../modules/Router.mjs';
import './MultiplayerView.scss';
import PopUpWindow from '../../blocks/PopUpWindow/PopUpWindow.mjs';

Array.prototype.removeElement = function(value) {
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
		// пагинатор комнат
		const items = {'Игра': 'hash', 'Название': 'title', 'Размер карты': 'mapsize', 'Время хода': 'timelimit', 'Игроков': 'players', 'Мест': 'maxplayers'};
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
		const addRoomButton = new Item('', function() {
			// форма создания комнаты	
			application.insertAdjacentHTML('beforeend', addForm());
			const popup1 = document.getElementById('popup1');

			const cross = document.getElementsByClassName('popup__close');
			cross[0].onclick = function(event) {
				event.preventDefault();
				application.removeChild(popup1);
			};

			const addRoomForm = document.getElementById('add_room');

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

				application.removeChild(popup1);

				this.roomBlock();
				this.listenRoomEvents();
				this.ws = new Socket(`/games/create?title=${this._gameName}&players=${this._playersCount}&timelimit=${this._time}&size=${this._mapSize}`, 'game');	
			});
		}, ['plus-button']);

		// таблица комнат
		const gamesBoard = new Table(items, ['leaders-table'], [paginator, addRoomButton], (event) => {
			let target = event.target;
			while (target.tagName !== 'tbody') {
				if (target.classList.contains('leaders-table__row')) {
					const gameParams = target.getElementsByClassName('leaders-table__cell');
					
					this._gameName = gameParams[1].textContent;
					this._mapSize = gameParams[2].textContent;
					this._playersCount = gameParams[5].textContent;
					this._time = gameParams[3].textContent;

					this.roomBlock();
					this.listenRoomEvents();
					this.ws = new Socket(`/games/connect?room=${gameParams[0].textContent}`, 'game');
					return;
				}
				target = target.parentNode;
			}	
		});

		this.pageContent.appendChild(gamesBoard.getElement());
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
				this._players.removeElement(data['User']['Username']);
				this.playersBlock();
				break;
			case 'ready': {
				const playerBlocks = document.getElementsByClassName('player-block');
				Array.from(playerBlocks).forEach(player => {
					const name = player.getElementsByTagName('div')[0];
					if (name.textContent === data['User']['Username']) {
						player.classList.add('player-block_ready');
					}
				});
				break;
			}
			case 'start':
				this.startGame();
				break;
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
		Users.profile((err, response) => {
			console.log(response);
			this.myNumber = this._players.indexOf(response['username']);
			const gameView = new GameView('multiplayer', this._mapSize, this._players, this._playersCount, units, this._time, this.myNumber, this.ws);
			gameView.render();
		});
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
			readyButton.setAttributes({disabled: 'disabled'});
		});
		this.pageContent.appendChild(readyButton.getElement());
	}
}