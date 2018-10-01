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
        Http.Post(callback, 'https://jackal.online/auth', data);
    }

    static logout(callback) {
        Http.Get(callback, 'https://jackal.online/logout');
    }

    static register(callback, data = {}) {
        Http.Post(callback, 'https://jackal.online/register', data);
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
        Http.Get(call, 'https://jackal.online/user');
    }

    static leaders(callback, data = {}) {
        const path ='https://jackal.online/leaderboard?page=' + data.page;
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