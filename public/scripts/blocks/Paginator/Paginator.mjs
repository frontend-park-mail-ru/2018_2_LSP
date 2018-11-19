import Block from '../Block/Block.mjs';
import Button from '../Button/Button.mjs';

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
	constructor(callback, classes) {
		super('div');
		this._currentPage = 0;

		const aright = new Button('right', '>', classes);
		this.append(aright);
		aright.event('click', () => {
			this._currentPage += 1;
			callback(this._currentPage);
		});

		const aleft = new Button('left', '<', classes);
		this.append(aleft);
		aleft.event('click', () => {
			if (this._currentPage == 0) {
				return;
			}
			this._currentPage -= 1;
			callback(this._currentPage);
		});
	}
}
