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
			console.log('Connected with WebSocket');
			this.socket.send('ping');
		}.bind(this);
		
		this.socket.onmessage = function(event) {
			console.log('WS:' + event.data);
			bus.emit('sw-message', event.data);
		};
        
		this.socket.onclose = function(event) {
			if (event.wasClean) {
				console.log('Connection closed');
			} else {
				console.log('Connection broke');
			}
			console.log('Code: ' + event.code + ' reason: ' + event.reason);
		};

		this.socket.onerror = function(error) {
			console.log('Error WS:' + error.message);
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