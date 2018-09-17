'use strict';

const PORT = 3000;

const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const filename = request.url === '/' ? 'public/index.html' : `public/${request.url}`;

    console.log('Request: %s', request.url);
    fs.readFile(filename, (error, file) => {
        if (error) {
            response.statusCode = 404;
			response.end();
			return;
        }
        response.end(file);
    });
});

server.listen(PORT);
console.log('Server started!');