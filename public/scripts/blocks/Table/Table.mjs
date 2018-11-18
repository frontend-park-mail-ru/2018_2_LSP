import Block from '../Block/Block.mjs';
import Paginator from '../Paginator/Paginator.mjs';
import Users from '../../services/users.mjs';
import Bus from '../../modules/eventBus.mjs';

export default class Table extends Block {
    /**
     * Создание новой таблицы
     * @param head заголовки столбцов таблицы
     * @param page номер страницы
     * @param callback функция-коллбек пагинации
     */
    constructor(fields = {}, page = 0) {
        super('table');
        this._page = page;
        this._fields = fields;

        // thead
        const thead = new Block('thead');
        const trhead = new Block('tr', ['head']);
        for (header in this._fields) {
            const th = new Block('th');
            th.setText(header);
            trhead.append(th);
        }
        thead.append(trhead);
        this.append(thead);

        // tfoot
        const tfoot = new Block('tfoot');
        const trfoot = new Block('tr', ['head']);
        const thfoot = new Block('th', [], {'colspan': 3});
        const paginator = new Paginator(function(page) {
            Users.leaders((err, response) => {
                if (!err) {
                    console.log(response);
					Bus.emit('paginator-update', response);
                } else {
                    alert(response.error);
                }
            }, {page: page});
        });
        thfoot.append(paginator);

        trfoot.append(thfoot);
        tfoot.append(trfoot);
        this.append(tfoot);

        // tbody
        this._tbody = new Block('tbody');
        // this._tbody.setText("");
        this.append(this._tbody);


        Bus.on('paginator-update', this.update.bind(this));
    }

    _data(data = []) {
        console.log(this._tbody);
        data.forEach(item => {
            const tr = document.createElement('tr');
            if (item.me) {  // если запись принадлежит данному пользователю, выделяем поле
                tr.classList.add('me');
            }            
            for (const header in this._fields) {
                const th = document.createElement('th');
                th.textContent = item[this._fields[header]];
                tr.appendChild(th);
            }
            this._tbody.getElement().appendChild(tr);
        });
        // this.getElement().appendChild(tbody);
    }

    update(data = []) {
        this._tbody.clear();
        this._data(data);
    }
}