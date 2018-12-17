import bus from './eventBus.mjs';

const host = 'jackal.online/api';

/**
 * Сервис для управления TCP соединением с бекендом через WebSocket (синглтон)
 * @module Socket
 */
export default class Socket {
	/**
     * Создать новый Web socket
     */
	constructor(url, tag = '') {
		const address = ['https', 'https:'].includes(location.protocol)	//в зависимости отпротокола выбор wss или ws
			? `wss://${host}${url}`
			: `ws://${host}${url}`;
		this.socket = new WebSocket(address);

		this.socket.onopen = function() {
			console.log('opened');
		}.bind(this);
		
		this.socket.onmessage = function(event) {
			console.log(`sended ${event.data}`);
			bus.emit(`sw-${tag}-message`, event.data);
		};

		this.socket.onclose = function(error) {
			console.log(error);
		};

		this.socket.onerror = function(error) {
			console.log(error);
		};

		bus.on(`sw-${tag}-send`, (data) => {
			this.send(data);
		});
	}

	/**
     * Отправить данные
     * @param {any} data данные
     */
	send(data = {}) {
		if (!this.socket.readyState) {  //проверка статуса ws
			setTimeout(function() {
				this.send(data);
			}.bind(this), 100);
		} else {
			this.socket.send(data);
		}
	}
}