import Block from '../Block/Block.mjs';
import Paginator from '../Paginator/Paginator.mjs';
import Users from '../../services/users.mjs';
import Bus from '../../modules/eventBus.mjs';

export default class Table extends Block {
	/**
     * Создание новой таблицы
     * @param head заголовки столбцов таблицы
     * @param page номер страницы
     * @param callback функция-коллбек получения i-ой страницы (аргумент - номер страницы)
     */
	constructor(fields = {}, tableClass = [], callback) {
		super('table', tableClass);
		this._fields = fields;

		// thead
		//const thead = new Block('thead');
		const trhead = new Block('tr', ['leaders-table__header']);
		for (const header in this._fields) {
			const th = new Block('th');
			th.setText(header);
			trhead.append(th);
		}
		//thead.append(trhead);
		//this.append(thead);
		this.append(trhead);

		// tfoot
		//const tfoot = new Block('tfoot');
		const trfoot = new Block('tr', ['leaders-table__footer']);
		const thfoot = new Block('th', [], {'colspan': Object.keys(this._fields).length});
		const paginator = new Paginator(callback);
		thfoot.append(paginator);

		trfoot.append(thfoot);
		//tfoot.append(trfoot);
		//this.append(tfoot);
		this.append(trfoot);

		// tbody
		this._tbody = new Block('tbody');
		this.append(this._tbody);

		Bus.on('paginator-update', this.update.bind(this));
		callback(0);
	}

	_data(data = []) {
		data.forEach(item => {
			const tr = document.createElement('tr');
			tr.classList.add('leaders-table__row');
			if (item.me) {  // если запись принадлежит данному пользователю, выделяем поле
				tr.classList.add('leaders-table__row_me');
			}            
			for (const header in this._fields) {
				const th = document.createElement('th');
				th.classList.add('leaders-table__cell');
				th.textContent = item[this._fields[header]];
				tr.appendChild(th);
			}
			this._tbody.getElement().appendChild(tr);
		});
	}

	update(data = []) {
		this._tbody.clear();
		// if (data === []) {
		//     alert('Нет данных в таблице');
		// }
		this._data(data);
	}
}