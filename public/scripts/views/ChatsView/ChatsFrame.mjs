// import BaseView from '../BaseView/BaseView.mjs';
import Chats from '../../services/chats.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Bus from '../../modules/eventBus.mjs';
// import Router from '../../modules/Router.mjs';
import someChat from './someChat.pug';
import messageView from './messageView.pug';

export default class ChatsFrame extends Block {
	constructor() {
        super('div');
	}
	
	rendertt() {
        const items = {'Чаты': 'chat-name'};
		
		const addChatButton = new Button('', '+');
		addChatButton.event({
			
		});

		const paginator = new Paginator(function(page) {
			Chats.list((err, response) => {
				if (!err) {
					Bus.emit('paginator-update', response);
				} else {
					Bus.emit('');
				}
			}, {page: page});
		});
		const chatsList = new Table(items, ['leaders-table'], [addChatButton, paginator]);
		this.append(chatsList);
		
		console.log(this);
		console.log(document.getElementById('application'));
		document.getElementById('application').appendChild(this.getElement());
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