'use strict';

const noop = () => null;

export default class Ajax {
    static _request(callback = noop, method = 'GET', path = '/', body = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, path, true);
        xhr.withCredentials = true;
    
        if (body) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        }
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }
            const response = JSON.parse(xhr.responseText);
            if (+xhr.status !== 200 && +xhr.status !== 201) {
                callback(xhr, response);
            } else {
                callback(null, response);
            }
        };
    
        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    }

    static Get(callback, path, body) {
        this._request(callback, method = 'GET', path, body);
    }
    
    static Post(callback, path, body) {
        this._request(callback, 'POST', path, body);
    }
}