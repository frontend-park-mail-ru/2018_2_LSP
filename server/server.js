'use strict';

const http = require('http');
const fs = require('fs');

const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const users = {
	'moleque@mail.ru': {
        login: 'Moleque',
		email: 'moleque@mail.ru',
		password: '1234',
		score: 72,
	},
	'molecada@yandex.ru': {
        login: 'Molecada',
		email: 'molecada@yandex.ru',
		password: '12345',
		score: 100500,
	}
};
const ids = {};

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

app.post('/auth', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;
	if (!password || !email) {
		return response.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return response.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	response.cookie('session', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	response.status(200).json({id});
});

app.get('/me', function(req, res) {
	const id = req.cookies['sessionid'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].score += 1;

	res.json(users[email]);
});

app.listen(PORT, function () {
	console.log(`Server listening port ${PORT}`);
});


//отдача файлов
// const server = http.createServer((request, response) => {
//     const filename = request.url === '/' ? 'public/index.html' : `public/${request.url}`;

//     console.log('Request: %s', request.url);
//     fs.readFile(filename, (error, file) => {
//         if (error) {
//             response.statusCode = 404;
// 			response.end();
// 			return;
//         }
//         response.end(file);
//     });
// });

//server.listen(PORT);
console.log('Server started!');