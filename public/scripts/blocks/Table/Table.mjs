import Block from '../Block/Block.mjs';
import Button from '../Button/Button.mjs';

export default class Table extends Block {
    /**
     * Создание новой таблицы
     * @param head заголовки столбцов таблицы
     * @param page номер страницы
     * @param callback функция-коллбек пагинации
     */
    constructor(head = [], page = 0, callback) {
        super('table');
        this.page = page;

        // thead
        const thead = new Block('thead');
        const trhead = new Block('tr', ['head']);
        head.forEach(thName => {
            const th = new Block('th');
            th.setText(thName)
            trhead.append(th);
        });
        thead.append(trhead);
        this.append(thead);

        // tfoot
        const tfoot = new Block('tfoot');
        const trfoot = new Block('tr', ['head']);
        const thfoot = new Block('th', [], {'colspan': 3});

        const aright = new Button('pagePlus', '>');
        thfoot.append(aright);

        // this.pageView = new Block('div');
        // this.pageView.setText(this.page);
        // thfoot.append(this.pageView);

        const aleft = new Button('pageMinus', '<');
        thfoot.append(aleft);

        // const pg = this.page - 1;
        // aleft.event('click', (pg) => {
        //     Users.leaders((err, response) => {
        //         // console.log(err, response);
        //         if (err === null) {
        //             //application.innerHTML = '';
        //             // const leadersPage = new Leaders(response);
        //             this.update(response);
	    //             // leadersPage.render();
        //         } else {
        //             alert(response.error);
        //         }
        //     }, {page: pg});
        // });

        trfoot.append(thfoot);
        tfoot.append(trfoot);
        this.append(tfoot);

        // tbody
        this.tbody = new Block('tbody');
        this.append(this.tbody);
    }

    _data(data = []) {
        data.forEach(item => {
            const tr = document.createElement('tr');
            if (item.me) {
                tr.classList.add('me');
            }
            for (const text in item) {
                if (text == 'me') {
                    continue;
                }
                const th = document.createElement('th');
                th.textContent = item[text];
                tr.appendChild(th);
            }
            this.tbody.getElement().appendChild(tr);
        });
    }

    update(data = []) {
        this.tbody.innerHTML = '';
        this._data(data);
    }
}