import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Paginator from '../../blocks/Paginator/Paginator.mjs';
import Users from '../../services/users.mjs';
import Table from '../../blocks/Table/Table.mjs';

export default class Leaders extends BaseView {
    constructor(){
        const view = baseView({'title': 'Лидеры'});
        super(view);
    }

    render() {
        const items = ['Логин', 'Сыграно', 'Рейтинг'];
        const leaderBoard = new Table(items, 0);

        this.pageContent.appendChild(leaderBoard.getElement());
    }
}