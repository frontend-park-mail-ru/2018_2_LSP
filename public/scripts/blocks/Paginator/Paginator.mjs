import Block from '../Block/Block.mjs';
import Button from '../Button/Button.mjs';
import Router from '../../modules/Router.mjs';

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
	constructor(callback, classes=['basic-button', 'basic-button_right']) {
		super('div');
		this._currentPage = 0;

		const aright = new Button('', '>', classes);
		this.append(aright);
		aright.event('click', () => {
			this._currentPage += 1;
			Router.go('/leaders/' + this._currentPage);
			callback(this._currentPage);
		});

        const aleft = new Button('', '<', classes=['basic-button', 'basic-button_right']);
		this.append(aleft);
		aleft.event('click', () => {
			if (this._currentPage == 0) {
				return;
			}
			this._currentPage -= 1;
			Router.go('/leaders/' + this._currentPage);
			callback(this._currentPage);
		});
	}
}
