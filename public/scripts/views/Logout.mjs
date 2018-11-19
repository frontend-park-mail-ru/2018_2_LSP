import Bus from '/scripts/modules/eventBus.mjs';
import Router from '/scripts/modules/Router.mjs';

export default class Logout {
	constructor () {
		Bus.emit('user:logged-out');
	}

	render() {
		Router.open('/menu');
	}
}