import Block from '../Block/Block.mjs';
import './Button.scss';

/**
 * Класс кнопки (наследуется от Block)
 * @module Button
 */
export default class Button extends Block {
	/**
     * Создать новую кнопку
     * @param {string} link адрес ссылки
     * @param {string} text текст кнопки
     * @param {Array} classes классы кнопки
     */
	constructor (link = '', text = '', classes = ['basic-button']) {
		super('a', classes, {'href': link});
		this.setText(text);
	}
}