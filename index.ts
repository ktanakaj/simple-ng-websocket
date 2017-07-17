/**
 * Simple WebSocket client for Angular2+.
 * @module ./index
 */
import { EventEmitter } from 'events';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';

/**
 * Connection URL DI Token.
 */
export const CONNECT_URL = new OpaqueToken('connectUrl');
/**
 * Logger DI Token.
 */
export const LOGGER = new OpaqueToken('logger');

/**
 * Simple WebSocket client class for Angular2+.
 */
@Injectable()
export class SimpleNgWebSocket extends EventEmitter {
	/** Connection URL */
	url: string;
	/** WebSocket raw connection */
	ws: WebSocket;
	/** Logger */
	logger: (level, message) => void;

	/** WebSocket送信データのキュー */
	private queue = [];

	/**
	 * 設定をDIしてコンポーネントを生成する。
	 * @param url 接続先URL。
	 * @param logger ロガー。
	 */
	constructor( @Inject(CONNECT_URL) @Optional() url?: string, @Inject(LOGGER) @Optional() logger?: (level, message) => void) {
		// URLが渡されなかった場合は、自分のサーバーに接続
		super();
		if (!url) {
			url = 'ws';
			if (window.location.protocol === 'https:') {
				url += 's';
			}
			url += '://' + window.location.host + '/';
		}
		this.url = url;
		this.logger = logger || (() => { });
		this.connect();
	}

	/**
	 * WebSocket接続を開始する。
	 */
	connect(): void {
		// 接続と同時に各種イベントのハンドラーを登録
		this.ws = new WebSocket(this.url);
		this.ws.onopen = (ev) => {
			this.logger('info', 'OPEN');
			this.emit('open', ev, this);
			this.fireQueue();
		};
		this.ws.onclose = (ev) => {
			this.logger('info', `CLOSE ${ev.reason}`);
			this.emit('close', ev, this);
		};
		this.ws.onmessage = (ev) => {
			this.logger('info', `RECEIVE ${ev.data}`);
			this.emit('message', ev, this);
		};
		this.ws.onerror = (ev) => {
			this.logger('error', `ERROR`);
			this.emit('error', ev, this);
		};
	}

	/**
	 * Send message.
	 * @param message メッセージ。
	 * @param toJson JSONエンコードする場合true。デフォルトtrue。
	 */
	send(message: any, toJson: boolean = true): void {
		if (toJson) {
			message = JSON.stringify(message);
		}
		// キューに積んで、接続済みの場合は即時送信、未接続の場合はopenイベントで送信
		this.queue.push(message);
		if (this.ws.readyState === WebSocket.OPEN) {
			this.fireQueue();
		} else if (this.ws.readyState !== WebSocket.CONNECTING) {
			this.connect();
		}
	}

	/**
	 * キューに格納されているメッセージを送信する。
	 */
	private fireQueue(): void {
		while (this.queue.length > 0) {
			const message = this.queue.shift();
			this.ws.send(message);
			this.logger('info', `SEND ${message}`);
		}
	}

	// Events
	emit(event: 'open', ev: Event, ngws: SimpleNgWebSocket): boolean;
	emit(event: 'message', ev: MessageEvent, ngws: SimpleNgWebSocket): boolean;
	emit(event: 'close', ev: CloseEvent, ngws: SimpleNgWebSocket): boolean;
	emit(event: 'error', ev: Event, ngws: SimpleNgWebSocket): boolean;
	emit(event: string | symbol, ...args: any[]): boolean {
		return super.emit(event, ...args);
	}
	on(event: 'open', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
	on(event: 'message', listener: (ev: MessageEvent, ngws: SimpleNgWebSocket) => void): this;
	on(event: 'close', listener: (ev: CloseEvent, ngws: SimpleNgWebSocket) => void): this;
	on(event: 'error', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
	on(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.on(event, listener);
	}
	once(event: 'open', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
	once(event: 'message', listener: (ev: MessageEvent, ngws: SimpleNgWebSocket) => void): this;
	once(event: 'close', listener: (ev: CloseEvent, ngws: SimpleNgWebSocket) => void): this;
	once(event: 'error', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
	once(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.once(event, listener);
	}
	removeListener(event: 'open', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
	removeListener(event: 'message', listener: (ev: MessageEvent, ngws: SimpleNgWebSocket) => void): this;
	removeListener(event: 'close', listener: (ev: CloseEvent, ngws: SimpleNgWebSocket) => void): this;
	removeListener(event: 'error', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
	removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.removeListener(event, listener);
	}
}
