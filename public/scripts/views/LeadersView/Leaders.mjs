import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Bus from '../../modules/eventBus.mjs';

export default class Leaders extends BaseView {
	constructor(){
		super('Лидеры');
	}

	render() {
		const items = {'Логин': 'username', 'Сыграно': 'totalgames', 'Рейтинг': 'totalscore'};
		const paginator = new Paginator(function(page) {
			Users.leaders((err, response) => {
				if (!err) {
					if (response.length === 0) {
						Bus.emit('empty-page', response);
					} else {
						Bus.emit('paginator-update', response);
					}
				}
			}, {page: page});
		});
		
		const leaderBoard = new Table(items, ['leaders-table'], [paginator]);

		this.pageContent.appendChild(leaderBoard.getElement());
	}
}