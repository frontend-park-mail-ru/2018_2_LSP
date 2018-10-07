import Http from '../modules/http.js';

const path = 'https://jackal.online';

/**
 * Сервис для работы с пользователями
 * @module Users
 */
export default class Users {
	static constructor() {
		this.user = null;
		this.id = null;
		this.users = {};
	}

	static auth(callback, data = {}) {
		Http.Post(callback, path + '/session', data);
	}

	// static logout(callback) {
	// 	Http.Get(callback, 'http://127.0.0.1:8080/logout');
	// 	Http.Delete(callback, '/session');
	// }

	static register(callback, data = {}) {
		Http.Post(callback, path + '/users', data);
	}

	static isLoggedIn() {
		return !!this.user;
	}

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
		Http.Get(call, '/users&id=');
	}

	static leaders(callback, data = {}) {
		const query = path + '/users?page=' + data.page + '&fields=email,rating&orderby=rating';
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
}