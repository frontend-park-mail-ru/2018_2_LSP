import Item from '../Item/Item.mjs';
import './Trigger.scss';

/**
 * Класс кнопки (наследуется от Block)
 * @module Button
 */
export default class Trigger extends Item {
	/**
     * Создать новую кнопку
     * @param {string} link адрес ссылки
     * @param {string} text текст кнопки
     * @param {Array} classes классы кнопки
     */
	constructor (name = '', classes = ['basic-button', 'trigger']) {
		super(name, function() {
			if (this.className == classes.join(' ')) {
				this.classList.add(classes[1] + '_hovered');
			} else {
				this.classList.remove(classes[1] + '_hovered');
			}
		}, classes);
	}
}