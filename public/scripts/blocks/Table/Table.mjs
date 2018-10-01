import { Block } from '../Block/Block.mjs';

export default class Table extends Block {
    constructor(head = []) {
        const table = document.createElement('table');
        super(table);
        this.table = table;
        this.head = head;
    }

    _header() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        tr.classList.add('head');
        this.head.forEach(thName => {
            const th = document.createElement('th');
            th.textContent = thName;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        this.table.appendChild(thead);
    }

    _data(data = []) {
        const tbody = document.createElement('tbody');
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
            tbody.appendChild(tr);
        });
        this.table.appendChild(tbody);
    }

    clear() {
        this.table.innerHTML = '';
    }

    update(data = []) {
        this.clear();
        this._header();
        this._data(data);
    }
}