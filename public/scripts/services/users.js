import Http from '../modules/http.js';

/**
 * Сервис для работы с пользователями
 * @module Users
 */
export default class Users {
	static constructor() {
		this.user = null;
		this.users = {};
	}

	static auth(callback, data = {}) {
		Http.Post(callback, 'https://127.0.0.1:8080/auth', data);
	}

	static logout(callback) {
		Http.Get(callback, 'https://127.0.0.1:8080/logout');
	}

	static register(callback, data = {}) {
		Http.Post(callback, 'https://127.0.0.1:8080/register', data);
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
		Http.Get(call, 'https://127.0.0.1:8080/user');
	}

	static leaders(callback, data = {}) {
		const path ='https://127.0.0.1:8080/leaderboard?page=' + data.page;
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
		Http.Get(call, path, data);
	}
}