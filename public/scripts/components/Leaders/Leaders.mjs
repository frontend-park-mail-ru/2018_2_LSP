import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';
import { Paginator } from '/scripts/blocks/Paginator/Paginator.mjs';
import Users from '/scripts/services/users.js';
import Table from '/scripts/blocks/Table/Table.mjs';

export class Leaders {
    constructor(users){
        this._users = users;
    }

    render() {
        this._renderLeaders(this._users);
    }

    _renderLeaders(users) {
        const header = new Header({type: 'backToMenu'});
        header.render();

        const leadersSection = Block.Create('section', ['centerSection'], {'dataset.sectionName': 'leaders'});
        const leadersTitle = Block.Create('h2');
        leadersTitle.setText('Лидеры');

        const leadersInner = Block.Create('div', [], {id:'leadersInner'});
        
        const items = ['Логин', 'Почта', 'Сыграно', 'Рейтинг'];
        const leaderBoard = new Table(items);
        const leaderBoardPaginator = new Paginator();
        const numberPage = 0;

        if (users) {
            leaderBoard.update(users);
            leadersInner.append(leaderBoard);
            leadersInner.append(leaderBoardPaginator);
        } else {
            const em = Block.Create('em');
            em.setText('Еще никто не установил рекорд. Вы можете быть первыми;)');
            leadersInner.append(em);

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
        leadersSection.append(leadersTitle);
        leadersSection.append(leadersInner);
        application.append(leadersSection.getElement());
    }
}