/**
 * Реализация патерна Observer (синглтон)
 * @module EventBus
 */
class EventBus {
	/**
     * Создать новый Event bus без событий
     */
	constructor() {
		this.listeners = {};
	}
    
	/**
     * Подписаться на событие
     * @param {string} event тип события
     * @param {Function} callback коллбек-функция
     */
	on(event, callback) {
		(this.listeners[event] || (this.listeners[event] = [])).push(callback);
	}
    
	/**
     * Отписываемся от события
     * @param {string} event тип события
     * @param {Function} callback коллбек-функция
     */
	off(event, callback) {
		this.listeners[event] = this.listeners[event].filter(function(listener) {
			return listener !== callback; 
		});
	}

	/**
     * Активация события
     * @param {string} event тип события
     * @param {any} data данные
     */
	emit(event, data) {
		if (!this.listeners[event]) return;
		this.listeners[event].forEach(function(listener) {  // выполнить для всех, кто подписан
			listener(data);
		});
	}
}

export default new EventBus();