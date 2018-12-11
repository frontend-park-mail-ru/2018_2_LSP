const errors = {
	'User not found': 'Пользователь не найден',
	'Wrong password for user': 'Неверно указана почта и/или пароль',
	'Wrong user password': 'Неверный пароль',
	'User is already registered': 'Пользователь с таким логином/почтой уже зарегистрирован',
	'User already exists': 'Пользователь уже существует',
    
	'username': 'Невалидный логин (кол-во символов должно быть: 4-25)',
	'passwords': 'Пароли должны совпадать',
	'Wrong old user password': 'Неверный старый пароль',
	'email': 'Невалидная почта',
	'symbols': 'Имя/фамилия должны состоять из 4-25 символов',
	'avatarImg': 'Аватар должен быть картинкой!',

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