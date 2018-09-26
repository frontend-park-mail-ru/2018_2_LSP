(function() {
    'use strict';

    const Ajax = window.Ajax;

    class Users {
        constructor() {

        }

        auth(callback, email, password) {
            const data = {email, password}
            Ajax.Post(callback, '/auth', data);
        }

        register(callback, login, email, password) {
            const data = {login, email, password}
            Ajax.Post(callback, '/register', data);
        }
    }

    window.Users = Users;
})()