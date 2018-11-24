const fallback = require('express-history-api-fallback');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const app = express();
const ws = require('express-ws');
const fs = require('fs');
const https = require('https');
const PORT = process.env.PORT || 3000;

const dir = path.resolve(__dirname, '..', 'public/build');
app.use(morgan('dev'));
app.use(express.static(dir));
app.use(fallback('/index.html', {root: dir}));
app.use(body.json());
app.use(cookie());

ws(app);

app.ws('/ws', function(socket) {
	console.log('WebSocket is opened');
	socket.send('Hello from node server!');

	socket.on('message', (message) => {
		console.log('WS: ' + message);
	});

	socket.on('close', () => {
		console.log('WebSocket is closed');
	});
});

//Сервер
app.listen(PORT, () => {
	console.log(`Server listening port ${PORT}`);
});

console.log('Server started!');