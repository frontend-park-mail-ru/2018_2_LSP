// import BaseView from '../BaseView/BaseView.mjs';
import Chats from '../../services/chats.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Item from '../../blocks/Chat/Item.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Bus from '../../modules/eventBus.mjs';
// import Router from '../../modules/Router.mjs';
import someChat from './someChat.pug';
import messageView from './messageView.pug';

export default class ChatsFrame extends Block {
	constructor() {
		super('div');
		this.chats = [];

		const addChatButton = new Item('+', () => {
			this.chatsList();
		});

		this.myChats = new Table({'Чаты': 'my-chats'}, ['leaders-table'], [addChatButton]);
		this.append(this.myChats);
		
		document.getElementById('application').appendChild(this.getElement());
	}
	
	render() {
        
	}

	rendertt() {
        const items = {'Чаты': 'chat-name'};		
		
		
		
	}

	addChat() {

	}

	chatsList() {
		this.myChats.hide();
		
		const paginator = new Paginator((page) => {
			Chats.list((err, response) => {
				if (!err) {
					response['chats'].forEach(chat => {
						const tbody = document.getElementsByTagName('tbody')[0];
						const item = new Item(chat['title'], () => {
							Chats.add((err, response) => {
								if (!err) {
									this.hide();
								}
							}, chat['title']);
						});
						tbody.appendChild(item.getElement());
					});
				}
			}, {page: page});
		});
		this.list = new Table({'Добавить чат': 'chats-list'}, ['leaders-table'], [paginator]);
		this.append(this.list);
	}

	render() { //renderSomeChat
		//application.innerHTML = '';
		const chatHtml = someChat();
		application.insertAdjacentHTML('beforeend', chatHtml);
		const sendButton = document.getElementById('sendButton');
		const inputField = document.getElementById('input-field');
		
		sendButton.onclick = function() {
			const chatPageBody = document.getElementsByClassName('chatPage-body');
			const mess = messageView({'content': inputField.value});
			// const message = document.createElement('p');
			//message.textContent = inputField.value;
			//application.appendChild(message);
			application.insertAdjacentHTML('beforeend', mess);
		};
	}
}