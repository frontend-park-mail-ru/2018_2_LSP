import Http from '../modules/http.mjs';

const path = 'https://jackal.online/api'; 

/**
 * Сервис для работы с пользователями
 * @module Users
 */
export default class Users {
	/**
	 * Авторизация пользователя
	 * @param {Function} callback функция-коллбек
	 * @param data 
	 */
	static auth(callback, data = {}) {
		Http.Post(callback, `${path}/session`, data);		
	}

	static logout(callback) {
		Http.Delete(callback, `${path}/session`);
		this.user = '';
		const date = new Date(0);
		document.cookie = 'name=; path=/; expires=' + date.toUTCString();
	}

	/**
	 * Регистрация пользователя
	 * @param {Function} callback функция-коллбек
	 * @param data 
	 */
	static register(callback, data = {}) {
		Http.Post(callback,`${path}/users`, data);
	}

	/**
	 * Проверка, является-ли пользователь авторизованным
	 */
	static isLoggedIn() {
		return !!this.user;
	}

	/**
	 * Получение данных профиля пользователя
	 * @param {Function} callback функция-коллбек
	 */
	static profile(callback) {
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
		
		Http.Get(call, `${path}/me?fields=id,username,email,firstname,lastname,totalscore,avatar,totalgames`);
	}

	/**
	 * Обновление данных профиля пользователя
	 * @param {Function} callback функция-коллбек
	 * @param id ID пользователя
	 * @param {Object} data 
	 */
	static updateInfo(callback, id, data = {}) {
		Http.Put(callback,`${path}/users/${id}`, data);
		this.user = '';
	}

	/**
	 * Загрузка аватарки пользователя
	 * @param {Function} callback функция-коллбек
	 * @param id ID пользователя
	 * @param {FormData} data 
	 */
	static setAvatar(callback, id, data = {}) {
		Http.Post(callback,`${path}/users/${id}`, data);	
		this.user = '';
	}

	/**
	 * Получение данных таблицы лидеров
	 * @param {Function} callback функция-коллбек
	 * @param {Object} data 
	 */
	static leaders(callback, data = {}) {
		const query = `${path}/users?page=${data.page}&fields=username,totalscore,totalgames&orderby=totalscore`;
		const call = function(err, users) {
			if (err) {
				return callback(err, users);
			}
			this.users = users;

			if (this.isLoggedIn()) {
				this.users = users.map(user => {
					if (this.user.email === user.email) {
						user.me = true;
					}
					return user;
				});
			}
			return callback(null, users);
		}.bind(this);
		Http.Get(call, query, data);
	}

	/**
	 * Парсинг кук
	 * @param {string} name название поля
	 */
	static _cookieParser(name) {
		const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
}
