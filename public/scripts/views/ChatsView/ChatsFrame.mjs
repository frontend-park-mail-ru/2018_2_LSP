// import BaseView from '../BaseView/BaseView.mjs';
import Chats from '../../services/chats.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Item from '../../blocks/Item/Item.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';

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

	chatsList() {
		this.myChats.hide();
		
		const paginator = new Paginator((page) => {
			Chats.list((err, response) => {
				if (!err) {
					response['chats'].forEach(chat => {
						const tbody = document.getElementsByTagName('tbody')[0];
						const item = new Item(chat['title'], () => {
							Chats.add((err) => {
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
}