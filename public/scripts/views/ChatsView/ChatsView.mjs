import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Bus from '../../modules/eventBus.mjs';
// import Router from '../../modules/Router.mjs';

export default class ChatsView extends BaseView {
	constructor(){
		super('Чаты');
	}

	render() {
		// Router.go('/leaders/0');
		const items = {'': 'chat-name'};
		const chatsList = new Table(items, ['leaders-table'], function(pPage) {}, {page: pPage});

		this.pageContent.appendChild(chatsList.getElement());
	}
}