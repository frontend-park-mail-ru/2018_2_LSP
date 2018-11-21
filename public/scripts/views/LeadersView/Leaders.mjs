import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';
import Bus from '../../modules/eventBus.mjs';
import baseView from '../BaseView/baseView.pug';
import Router from '../../modules/Router.mjs';


export default class Leaders extends BaseView {
    constructor(){
        const view = baseView({'title': 'Лидеры'});
        super(view);
    }

    render() {
        //Router.go({state:'/leaders/', params: {page: 1}});
        Router.go('/leaders/0');
        const items = {'Логин': 'username', 'Сыграно': 'totalgames', 'Рейтинг': 'rating'};
        const leaderBoard = new Table(items, function(pPage) {
            Users.leaders((err, response) => {  // через промис?
                if (!err) {
                    Bus.emit('paginator-update', response);
                } else {
                    Bus.emit('');   //ПОПРАВИТЬ!!!
                }
            }, {page: pPage});
        });

		this.pageContent.appendChild(leaderBoard.getElement());
	}
}