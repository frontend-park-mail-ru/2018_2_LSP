import { Block } from '../Block/Block.mjs';
import { Users } from '../../services/users.mjs';
import { Leaders } from '../../components/Leaders/Leaders.mjs';
import { Table } from '../Table/Table.mjs';

export class Paginator extends Table {
    constructor(table) {
        super(['<-', '->']);
        this.page = 1;

        const callback = (event, page) => {
            console.log(event.target);
            if (event.href === 'pagePlus') {
                event.preventDefault();
                console.log('plus');
            } else if (event.href === 'minusPlus') {
                event.preventDefault();
                console.log('minus');
            } else {
                return;
            }

            Users.leaders((err, leadersData) => {
                console.log(err, leadersData);
                if (err === null) {
                    this.table.update(leadersData);
                } else {
                    alert(leadersData.error);
                }
            }, {page:page});
        }

        const tr = document.createElement('tr');
        tr.classList.add('head');
        const thleft = document.createElement('th');
        const aleft = new Block('a', [], {'href':'pageMinus'});
        aleft.setText('<-');
        aleft.event('click', callback(event, this.page - 1));
        thleft.appendChild(aleft.getElement());
        tr.appendChild(thleft);

        const thright = document.createElement('th');
        const aright = new Block('a', [], {'href':'pagePlus'});
        aright.setText('->');
        aright.event('click', callback(event, this.page + 1));
        thright.appendChild(aright.getElement());
        tr.appendChild(thright);
        this.getElement().appendChild(tr);
    }
}