import bus from './eventBus.mjs';

/**
 * Сервис для управления TCP соединением с бекендом через WebSocket (синглтон)
 * @module Socket
 */
class Socket {
	/**
     * Создать новый Web socket
     */
	constructor() {
		const address = ['https', 'https:'].includes(location.protocol)	//в зависимости отпротокола выбор wss или ws
			? `wss://${location.host}/ws`
			: `ws://${location.host}/ws`;
		this.socket = new WebSocket(address);

		this.socket.onopen = function() {
			this.socket.send('ping');
		}.bind(this);
		
		this.socket.onmessage = function(event) {
			bus.emit('sw-message', event.data);
		};

		bus.on('sw-send', (data) => {
			this.send(data);
		});
	}

	/**
     * Отправить данные
     * @param {any} data данные
     */
	send(data) {
		if (!this.socket.readyState) {  //проверка статуса ws
			setTimeout(function() {
				this.send(data);
			}.bind(this), 100);
		} else {
			this.socket.send(data);
		}
	}
}

export default new Socket();