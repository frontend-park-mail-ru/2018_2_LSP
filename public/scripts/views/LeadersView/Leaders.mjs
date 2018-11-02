import BaseView from '../BaseView/BaseView.mjs';

import { Block } from '/scripts/blocks/Block/Block.mjs';
import { Paginator } from '/scripts/blocks/Paginator/Paginator.mjs';
import { Users } from '/scripts/services/users.mjs';
import { Table } from '/scripts/blocks/Table/Table.mjs';

export default class Leaders extends BaseView{
    constructor(users){
        const view = baseView({"headerType": "backToMenu","navClass": "backButton", "title": "Лидеры"});
        super(view);
        this._users = users;
    }

    render() {
        this._renderLeaders(this._users);
    }

    _renderLeaders(users) {
        const items = ['Логин', 'Почта', 'Сыграно', 'Рейтинг'];
        const leaderBoard = new Table(items);
        const leaderBoardPaginator = new Paginator(leaderBoard);
        const numberPage = 0;

        if (users) {
            leaderBoard.update(users);
            this.pageContent.append(leaderBoard.getElement());
            this.pageContent.append(leaderBoardPaginator.getElement());
        } else {
            const em = new Block('em');
            em.setText('Еще никто не установил рекорд. Вы можете быть первыми;)');
            this.pageContent.appendChild(em.getElement())

            Users.leaders((err, response) => {
                console.log(err, response);
                if (err === null) {
                    application.innerHTML = '';
                    const leadersPage = new Leaders(response);
	                leadersPage.render();
                } else {
                    alert(response.error);
                }
            }, {page: numberPage});
        }
    }
}