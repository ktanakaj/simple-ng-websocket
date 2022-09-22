/// <reference types="node" />
import { EventEmitter } from 'events';
import { InjectionToken } from '@angular/core';
export declare const CONNECT_URL: InjectionToken<string>;
export declare const LOGGER: InjectionToken<string>;
export declare class SimpleNgWebSocket extends EventEmitter {
    url: string;
    ws: WebSocket;
    logger: (level: string, message: string) => void;
    private queue;
    constructor(url?: string, logger?: (level: string, message: string) => void);
    connect(): void;
    close(code?: number, reason?: string): void;
    send(message: any, toJson?: boolean): void;
    private fireQueue;
    emit(event: 'open', ev: Event, ngws: SimpleNgWebSocket): boolean;
    emit(event: 'message', ev: MessageEvent, ngws: SimpleNgWebSocket): boolean;
    emit(event: 'close', ev: CloseEvent, ngws: SimpleNgWebSocket): boolean;
    emit(event: 'error', ev: Event, ngws: SimpleNgWebSocket): boolean;
    on(event: 'open', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
    on(event: 'message', listener: (ev: MessageEvent, ngws: SimpleNgWebSocket) => void): this;
    on(event: 'close', listener: (ev: CloseEvent, ngws: SimpleNgWebSocket) => void): this;
    on(event: 'error', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
    once(event: 'open', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
    once(event: 'message', listener: (ev: MessageEvent, ngws: SimpleNgWebSocket) => void): this;
    once(event: 'close', listener: (ev: CloseEvent, ngws: SimpleNgWebSocket) => void): this;
    once(event: 'error', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
    removeListener(event: 'open', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
    removeListener(event: 'message', listener: (ev: MessageEvent, ngws: SimpleNgWebSocket) => void): this;
    removeListener(event: 'close', listener: (ev: CloseEvent, ngws: SimpleNgWebSocket) => void): this;
    removeListener(event: 'error', listener: (ev: Event, ngws: SimpleNgWebSocket) => void): this;
}
