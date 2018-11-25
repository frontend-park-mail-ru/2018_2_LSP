// import BaseView from '../BaseView/BaseView.mjs';
import Chats from '../../services/chats.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Bus from '../../modules/eventBus.mjs';
// import Router from '../../modules/Router.mjs';

export default class ChatsFrame extends Block {
	constructor() {
        super('div');

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
    }
}