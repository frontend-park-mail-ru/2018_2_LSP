import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Bus from '../../modules/eventBus.mjs';
import Router from '../../modules/Router.mjs';

export default class Leaders extends BaseView {
	constructor(){
		super('Лидеры');
	}

	render() {
		Router.go('/leaders/0');
		const items = {'Логин': 'username', 'Сыграно': 'totalgames', 'Рейтинг': 'rating'};
		const leaderBoard = new Table(items, ['leaders-table'], function(pPage) {
			Users.leaders((err, response) => {
				if (!err) {
					Bus.emit('paginator-update', response);
				} else {
					Bus.emit('');
				}
			}, {page: pPage});
		});

		this.pageContent.appendChild(leaderBoard.getElement());
	}
}