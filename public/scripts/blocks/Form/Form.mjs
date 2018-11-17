import Block from '../Block/Block.mjs';

/**
 * Класс формы (наследуется от Block)
 * @module Form
 */
export default class Form extends Block {
	/**
     * Создать новую форму
     * @param {Array} fields поля формы
     */
	constructor(fields = []) {
		super('form');
		fields.forEach(field => {
			const fieldElement = new Block('p');
			fieldElement.append(new Block('input', field.classes, field.attributes));
			this.append(fieldElement);
		});
	}

	/**
     * Навешиваем событие сразу с данными из формы
     * @param {*} callback 
     */
	submit(callback) {
		this.event('submit', function(event) {
			event.preventDefault();
			const formdata = {};
			const elements = this.getElement().elements;
			for (let element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}
			callback(formdata);
		}.bind(this));
	}
}