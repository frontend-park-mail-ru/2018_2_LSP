/**
 * Базовый класс элемента страницы
 * @module Block
 */
export default class Block {
	/**
     * Создать новый html элемент
     * @param {string} tag тег создаваемого элемента
     * @param {Array} classes классы элемента
     * @param {Object} attributes атрибуты элемента
     */
	constructor(tag = 'div', classes = [], attributes = {}) {
		this.element = document.createElement(tag);
		classes.forEach(oneClass => {
			this.element.classList.add(oneClass);
		});

		for (let attribute in attributes) {
			this.element.setAttribute(attribute, attributes[attribute]);
		}
	}

	/**
     * Получить элемент
     */
	getElement() {
		return this.element;
	}

	/**
     * Скрыть элемент
     */
	hide() {
		this.element.setAttribute('hidden', true);
	}

	/**
     * Отобразить элемент
     */
	show() {
		this.element.removeAttribute('hidden', true);
	}

	/**
     * Очистить содержимое элемента
     */
	clear() {
		this.element.innerHTML = '';
	}

	/**
     * Установить текст элемента
     * @param {string} text текст устанавливаемый в элемент 
     */
	setText(text = '') {
		this.element.textContent = text;
	}

	/**
     * Вложить сторонний блок в текущий
     * @param {Block} block сторонний блок
     */
	append(block) {
		this.element.appendChild(block.element);
	}

	/**
     * Навесить на блок событие
     * @param {string} type тип события
     * @param {Function} callback функция-коллбек
     */
	event(type, callback) {
		this.element.addEventListener(type, callback);
		return function() {
			this.element.removeAttribute(type, callback);
		}.bind(this);
	}
}