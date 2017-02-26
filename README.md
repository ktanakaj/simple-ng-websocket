# simple-ng-websocket
[![NPM](https://nodei.co/npm/simple-ng-websocket.png?downloads=true)](https://nodei.co/npm/simple-ng-websocket/)
[![Build Status](https://travis-ci.org/ktanakaj/simple-ng-websocket.svg?branch=master)](https://travis-ci.org/ktanakaj/simple-ng-websocket)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

This is simple WebSocket client for [Angular2+](https://angular.io/). simple-ng-websocket is thin wrapper at Browser's [WebSocket](https://developer.mozilla.org/en/docs/Web/API/WebSocket).

## Install
To install simple-ng-websocket in the current directory, run:

    npm install simple-ng-websocket

## Usage
simple-ng-websocket can be use to Angular provider.

First, you must define it in the providers.

    import { NgModule } from '@angular/core';
    import { SimpleNgWebSocket, CONNECT_URL, LOGGER } from 'simple-ng-websocket';

    @NgModule({
    	providers: [
    		{ provide: CONNECT_URL, useValue: 'ws://' + window.location.host + '/ws/' },
    		{ provide: LOGGER, useValue: (level, message) => console.log(message) },
    		SimpleNgWebSocket,
    	],
    })
    export class AppModule { }

You can inject `CONNECT_URL` and `LOGGER` parameters.

* `CONNECT_URL` : The URL to which to connect. If `CONNECT_URL` is not specified, the client connect to `'ws://' + window.location.host + '/'` or `'wss://' + window.location.host + '/'`.
* `LOGGER` : The logger for this client's log event such as OPEN, CLOSE, SEND, RECEIVE and ERROR.

Then, you can use it on your logic code.

    import { Injectable } from '@angular/core';
    import { SimpleNgWebSocket } from 'simple-ng-websocket';

    @Injectable()
    export class SampleService {
    	constructor(private ngws: SimpleNgWebSocket) {
    		this.ngws.on('message', (msg) => {
    			console.log(msg);
    		});
    	}

    	sendMessage(msg: string): void {
    		this.ngws.send(msg);
    	}
    }

## API

### Class: SimpleNgWebSocket
#### new SimpleNgWebSocket([url, logger])
* `url` {String} It is the same as `CONNECT_URL`.
* `logger` {Function} It is the same as `LOGGER`.

Create a new websocket connection. The constructor call `connect()` automatically.

#### Event: 'open'
* `ev` {Event}
* `ngws` {SimpleNgWebSocket}

Emitted when the handshake is complete. `ev` is through from Browser's `WebSocket`.

#### Event: 'message'
* `ev` {MessageEvent}
* `ngws` {SimpleNgWebSocket}

Emitted when a message is received from the server. `ev` is through from Browser's `WebSocket`.

#### Event: 'close'
* `ev` {CloseEvent}
* `ngws` {SimpleNgWebSocket}

Emitted when the connection is closed. `ev` is through from Browser's `WebSocket`.

#### Event: 'error'
* `ev` {ErrorEvent}
* `ngws` {SimpleNgWebSocket}

Emitted when an error occurs. `ev` is through from Browser's `WebSocket`.

#### ngws.connect()
Open a new websocket connection.

#### ngws.send(message[, toJson])
* `message` {String} The message to send.
* `toJson` {Boolean} Specifies whether message should be `JSON.stringify()` or not. Defaults to true.

Sends `message` through the connection. If the connection was not opend, `send()` call `connect()` automatically.

#### ngws.url
* {String}

The URL of the WebSocket server.

#### ngws.ws
* {WebSocket}

The connection instance of the raw `WebSocket`.

## Example
You can find a example web application here.

* [ktanakaj/ws-chat-sample](https://github.com/ktanakaj/ws-chat-sample)

## License
[MIT](https://github.com/ktanakaj/simple-ng-websocket/blob/master/LICENSE)
