import Http from '../modules/http.mjs';

const path = 'https://jackal.online/api'; 

/**
 * Сервис для работы с чатами
 * @module Chats
 */
export default class Chats {
	/**
	 * Создание чата
	 * @param {Function} callback функция-коллбек
	 * @param data 
	 */
	static add(callback, data = {}) {
		Http.Post(callback, path + '/chat', data);		
	}

	/**
	 * Получение данных выбранного чата
	 * @param {Function} callback функция-коллбек
	 */
	static dialog(callback) {
		if (this.isLoggedIn()) {
			return callback(null, this.user);
		} 

		const call = function(err, user) {
			if (err) {
				return callback(err, user);
			}
			this.user = user;
			return callback(null, user);
		}.bind(this);
		Http.Get(call, path + '/chat?fields=username,email,firstname,lastname,rating,avatar,totalgames');
	}

	/**
	 * Получение списка чатов
	 * @param {Function} callback функция-коллбек
	 * @param {Object} data 
	 */
	static list(callback, data = {}) {
		const query = path + '/chats';
		const call = function(err, chats) {
			if (err) {
				return callback(err, chats);
			}
			return callback(null, chats);
		}.bind(this);
		Http.Get(call, query, data);
	}
}
