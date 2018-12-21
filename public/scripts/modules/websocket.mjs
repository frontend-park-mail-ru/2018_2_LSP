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
		
		this.socket.onmessage = function(event) {
			bus.emit(`sw-${tag}-message`, event.data);
		};

		this.socket.onclose = function(event) {
			console.log(event);
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