import Bus from '../modules/eventBus.mjs';
import Router from '../modules/Router.mjs';

export default class Logout {
	constructor () {
		Bus.emit('user:logged-out');
	}

	render() {
		Router.open('/');
	}
}