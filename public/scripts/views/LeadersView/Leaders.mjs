import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';

export default class Leaders extends BaseView {
    constructor(){
        const view = baseView({'title': 'Лидеры'});
        super(view);
        // this._users = users;
        // this._page
    }

    render() {
        const items = ['Логин', 'Сыграно', 'Рейтинг'];
        const leaderBoard = new Table(items, 0, function(page) {
            Users.leaders((err, response) => {
                // console.log(err, response);
                if (err === null) {
                    //application.innerHTML = '';
                    // const leadersPage = new Leaders(response);
	                leadersPage.render();
                } else {
                    alert(response.error);
                }
            }, {page: page});
        });

        this.pageContent.appendChild(leaderBoard.getElement());

        // if (users) {
        //     leaderBoard.update(users);
        //     this.pageContent.append(leaderBoard.getElement());
        //     this.pageContent.append(leaderBoardPaginator.getElement());
        // } 
        // else {
        //     const em = new Block('em');
        //     em.setText('Еще никто не установил рекорд. Вы можете быть первыми;)');
        //     this.pageContent.appendChild(em.getElement())

            // Users.leaders((err, response) => {
            //     console.log(err, response);
            //     if (err === null) {
            //         //application.innerHTML = '';
            //         const leadersPage = new Leaders(response);
	        //         leadersPage.render();
            //     } else {
            //         alert(response.error);
            //     }
            // }, {page: numberPage});
        // }
    }
}