import BaseView from '../BaseView/BaseView.mjs';
import Chats from '../../services/chats.mjs';
// import Block from '../../blocks/Block/Block.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Bus from '../../modules/eventBus.mjs';
import Block from '../../blocks/Block/Block.mjs';
// import Router from '../../modules/Router.mjs';

export default class ChatsView extends BaseView {
	constructor(){
		super('Чаты');
	}

	render() {
		const frame = new Block('iframe', [], {'src': '/chatsframe'});
		this.pageContent.appendChild(frame.getElement());
	}
}