/**
 * @file Test for simple-ng-websocket
 */
import { SimpleNgWebSocket } from './simple-ng-websocket';

describe('SimpleNgWebSocket', () => {
  it('should connect to argument url', (done) => {
    // グローバルのWebSocketを無理やりモックに置き換えてテスト
    globalThis['WebSocket'] = class {
      constructor(url: string) {
        setTimeout(() => this.onopen(<any>url), 10);
      }
      onopen(ev: Event) { }
    } as any;
    const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
    ngws.on('open', (ev, ngws2) => {
      expect(<any>ev).toEqual('ws://example.com/ws-api');
      expect(ngws2).toBe(ngws);
      done();
    });
  });

  it('should send messages', () => {
    // グローバルのWebSocketを無理やりモックに置き換えてテスト
    let messages: string[] = [];
    globalThis['WebSocket'] = class {
      redayState: number = WebSocket.OPEN;
      send(message: any) {
        messages.push(message);
      }
    } as any;
    const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
    ngws.send('test message1');
    ngws.send('test message2', false);
    ngws.send({ msg: 'test3' });
    expect(messages).toEqual([
      '"test message1"',
      'test message2',
      '{"msg":"test3"}'
    ]);
  });

  it('should call message event', (done) => {
    // グローバルのWebSocketを無理やりモックに置き換えてテスト
    globalThis['WebSocket'] = class {
      constructor(url: string) {
        setTimeout(() => this.onmessage(<any>'dummy'), 10);
      }
      onmessage(ev: MessageEvent) { }
    } as any;
    const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
    ngws.on('message', (ev, ngws2) => {
      expect(<any>ev).toEqual('dummy');
      expect(ngws2).toBe(ngws);
      done();
    });
  });

  it('should call close event', (done) => {
    // グローバルのWebSocketを無理やりモックに置き換えてテスト
    globalThis['WebSocket'] = class {
      constructor(url: string) {
        setTimeout(() => this.onclose(<any>'dummy'), 10);
      }
      onclose(ev: CloseEvent) { }
    } as any;
    const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
    ngws.on('close', (ev, ngws2) => {
      expect(<any>ev).toEqual('dummy');
      expect(ngws2).toBe(ngws);
      done();
    });
  });

  it('should call error event', (done) => {
    // グローバルのWebSocketを無理やりモックに置き換えてテスト
    globalThis['WebSocket'] = class {
      constructor(url: string) {
        setTimeout(() => this.onerror(<any>'dummy'), 10);
      }
      onerror(ev: Event) { }
    } as any;
    const ngws = new SimpleNgWebSocket('ws://example.com/ws-api');
    ngws.on('error', (ev, ngws2) => {
      expect(<any>ev).toEqual('dummy');
      expect(ngws2).toBe(ngws);
      done();
    });
  });
});
