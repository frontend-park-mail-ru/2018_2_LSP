import Http from '../modules/http.mjs';

const path = 'https://jackal.online/api'; 

/**
 * Сервис для работы с пользователями
 * @module Games
 */
export default class Games {
	/**
	 * Авторизация пользователя
	 * @param {Function} callback функция-коллбек
	 * @param data 
	 */
	
	/**
	 * Получение данных об играх
	 * @param {Function} callback функция-коллбек
	 * @param {Object} data 
	 */
	static list(callback, data = {}) {
		const query = path + '/games';
		const call = function(err, games) {
			if (err) {
				return callback(err, games);
			}
			return callback(null, games);
		}.bind(this);
		Http.Get(call, query, data);
	}
}
