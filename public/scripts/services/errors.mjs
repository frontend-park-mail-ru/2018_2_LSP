const errors = {
	'User not found': 'Пользователь не найден',
	'Wrong password for user': 'Не верно указана почта и/или пароль',
	'Email is already taken': 'Пользователь с такой почтой уже существует',
	'Username is already taken': 'Пользователь с таким логином уже существует',
    
	'username': 'Невалидный логин (кол-во символов должно быть: 4-25)',
	'passwords': 'Пароли должны совпадать',
	'email': 'Невалидная почта',

	'undefined': 'Неизвестная ошибка',
};

/**
 * Сервис для обработки ошибок (синглтон)
 * @module Errors
 */
class Errors {
	/**
     * Создать новый обработчик ошибок
     * @param {Array} errors список ошибок
     */
	constructor(errors) {
		this.errors = errors;
	}

	/**
     * Получить текстовое представление по коду ошибки
     * @param {string} error код ошибки
     */
	getErrorString(error) {
		let errorString = this.errors[error];
		if (!errorString) {
			errorString = this.errors['undefined'];
		}
		return errorString;
	}
}

export default new Errors(errors);