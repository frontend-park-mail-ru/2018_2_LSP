import Ajax from '../modules/ajax.js';

export default class Users {
    constructor() {
        console.log('hi');
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