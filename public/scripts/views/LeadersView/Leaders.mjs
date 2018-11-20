import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Bus from '../../modules/eventBus.mjs';
import baseView from '../BaseView/baseView.pug';

export default class Leaders extends BaseView {
	constructor(){
		const view = baseView({'title': 'Лидеры'});
		super(view);
	}

	render() {
		const items = {'Логин': 'username', 'Сыграно': 'totalgames', 'Рейтинг': 'rating'};
		const leaderBoard = new Table(items, function(page) {
			Users.leaders((err, response) => {  // через промис?
				if (!err) {
					Bus.emit('paginator-update', response);
				} else {
					Bus.emit('');   //ПОПРАВИТЬ!!!
				}
			}, {page: page});
		});

		this.pageContent.appendChild(leaderBoard.getElement());
	}
}