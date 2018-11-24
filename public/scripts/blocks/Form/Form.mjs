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
		super('form', ['basic-form']);
		fields.forEach(field => {
			const fieldElement = new Block('input', field.classes = ['basic-form__input'], field.attributes);
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