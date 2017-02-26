/**
 * @file Test for index.ts
 */
import * as assert from "power-assert";
import 'reflect-metadata';
import { SimpleNgWebSocket } from "../";

describe("SimpleNgWebSocket", () => {
	describe('#constructor()', () => {
		it('should connect to argument url', (done) => {
			// グローバルのWebSocketを無理やりモックに置き換えてテスト
			global['WebSocket'] = class {
				constructor(url) {
					setTimeout(() => this.onopen(<any>url), 10);
				}
				onopen(ev: Event) { }
			};
			const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
			ngws.on('open', (ev, ngws2) => {
				assert.equal(ev, 'ws://example.com/ws-api');
				assert.strictEqual(ngws2, ngws);
				done();
			});
		});

		it('should send messages', () => {
			// グローバルのWebSocketを無理やりモックに置き換えてテスト
			let messages = [];
			global['WebSocket'] = class {
				redayState: number = WebSocket.OPEN;
				send(message: any) {
					messages.push(message);
				}
			};
			const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
			ngws.send('test message1');
			ngws.send('test message2', false);
			ngws.send({ msg: 'test3' });
			assert.deepStrictEqual(messages, [
				'"test message1"',
				'test message2',
				'{"msg":"test3"}'
			]);
		});

		it('should call message event', (done) => {
			// グローバルのWebSocketを無理やりモックに置き換えてテスト
			global['WebSocket'] = class {
				constructor(url) {
					setTimeout(() => this.onmessage(<any>'dummy'), 10);
				}
				onmessage(ev: MessageEvent) { }
			};
			const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
			ngws.on('message', (ev, ngws2) => {
				assert.equal(ev, 'dummy');
				assert.strictEqual(ngws2, ngws);
				done();
			});
		});

		it('should call close event', (done) => {
			// グローバルのWebSocketを無理やりモックに置き換えてテスト
			global['WebSocket'] = class {
				constructor(url) {
					setTimeout(() => this.onclose(<any>'dummy'), 10);
				}
				onclose(ev: CloseEvent) { }
			};
			const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
			ngws.on('close', (ev, ngws2) => {
				assert.equal(ev, 'dummy');
				assert.strictEqual(ngws2, ngws);
				done();
			});
		});

		it('should call error event', (done) => {
			// グローバルのWebSocketを無理やりモックに置き換えてテスト
			global['WebSocket'] = class {
				constructor(url) {
					setTimeout(() => this.onerror(<any>'dummy'), 10);
				}
				onerror(ev: Event) { }
			};
			const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
			ngws.on('error', (ev, ngws2) => {
				assert.equal(ev, 'dummy');
				assert.strictEqual(ngws2, ngws);
				done();
			});
		});
	});
});
