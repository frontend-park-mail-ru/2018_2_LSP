import Block from '../Block/block.js'

export default class Table extends Block {
    constructor(head = []) {
        const table = document.createElement('table');
        super(table);
    }

    _header() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        for (thName in head) {
            const th = document.createElement('th');
            th.textContent = thName;
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        this.table.appendChild(thead);
    }

    _data(data = []) {
        const tbody = document.createElement('tbody');
        for (item in data) {
            const tr = document.createElement('tr');
            for (text in Object.item.values()) {
                const th = document.createElement('th');
                th.textContent = item.text;
                if (item.me) {
                    tr.classList.add('me');
                }
                tr.appendChild(th);
            }
        }
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