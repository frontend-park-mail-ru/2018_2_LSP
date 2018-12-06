import Block from '../Block/Block.mjs';
import './Form.scss';

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
			const div = new Block('div');

			if(field.fieldName) {
				const fieldLabel = new Block('label',['basic-form__label']);			
				fieldLabel.setText(field.fieldName);
				div.append(fieldLabel);
			}

			if(field.classes.length == 0) {
				field.classes = ['basic-form__input'];
			}

			const fieldElement = new Block('input', field.classes, field.attributes);
			div.append(fieldElement);
			this.append(div);
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