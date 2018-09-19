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
		gamecount: 5,
		score: 72,
	},
	'molecada@yandex.ru': {
        login: 'Molecada',
		email: 'molecada@yandex.ru',
		password: '12345',
		gamecount: 7,
		score: 100500,
	}
};
const ids = {};

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

//POST запросы
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

app.post('/register', function(request, response) {
	const login = request.body.login
	const email = request.body.email;
	const password = request.body.password;
	if (!password || !email || !login || !email.match(/@/)) {
		return response.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return response.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	ids[id] = email;
	users[email] = {login, email, password, gamecount: 0, score: 0};

	response.cookie('session', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	response.status(201).json({id});
});

//GET запросы
app.get('/user', function(request, response) {
	const id = request.cookies['session'];
	const email = ids[id];
	if (!email || !users[email]) {
		return response.status(401).json({error: 'Нет такого пользователя'});
	}

	response.status(200).json(users[email]);
});

app.get('/users', function (request, response) {
	const scorelist = Object.values(users).sort((l, r) => r.score - l.score).map(user => {
			return {
				login: user.login, 
				email: user.email,
				gamecount: user.gamecount, 
				score: user.score
			};
		});
	response.json(scorelist);
});

//Сервер
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