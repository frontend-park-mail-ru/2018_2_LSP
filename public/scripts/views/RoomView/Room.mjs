import BaseView from '../BaseView/BaseView.mjs';
import Games from '../../services/games.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Bus from '../../modules/eventBus.mjs';

export default class Leaders extends BaseView {
	constructor(){
		super('Мультиплеер');
	}

	render() {
		const items = {'Игра': 'username', 'Кол-во игроков': 'players'};
		const paginator = new Paginator(function(page) {
			Games.list((err, response) => {
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