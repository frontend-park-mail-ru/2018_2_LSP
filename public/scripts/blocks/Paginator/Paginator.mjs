import Block from '../Block/Block.mjs';
import Item from '../Item/Item.mjs';
import Bus from '../../modules/eventBus.mjs';

/**
 * Блок пагинации (наследуется от Block)
 * @module Paginator
 */
export default class Paginator extends Block {
	/**
	 * Создание пагинатора
	 * @param callback функция-коллбек получения i-ой страницы (аргумент - номер страницы)
	 * @param classes классы, накладоваемые на кнопки пагинации
	 */
	constructor(callback = {}, page = 0, classes=['basic-button', 'basic-button_right']) {
		super('div');
		this._currentPage = page;

		callback(this._currentPage);

		const aright = new Item('>', () => {
			this._currentPage += 1;
			callback(this._currentPage);
		}, classes);
		this.append(aright);

		const aleft = new Item('<', () => {
			if (this._currentPage === 0) {
				return;
			}
			this._currentPage -= 1;
			callback(this._currentPage);
		}, classes);
		this.append(aleft);

		Bus.on('empty-page', () => {
			if (this._currentPage !== 0) {
				this._currentPage -= 1;
			}
		});
	}
}
