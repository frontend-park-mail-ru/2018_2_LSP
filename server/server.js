'use strict';

const fallback = require('express-history-api-fallback');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

app.use(fallback('index.html', {root: path.resolve(__dirname, '..', 'public')}));

//Сервер
app.listen(PORT, () => {
	console.log(`Server listening port ${PORT}`);
});

console.log('Server started!');