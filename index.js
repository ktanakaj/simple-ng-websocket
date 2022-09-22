"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleNgWebSocket = exports.LOGGER = exports.CONNECT_URL = void 0;
const events_1 = require("events");
const core_1 = require("@angular/core");
exports.CONNECT_URL = new core_1.InjectionToken('connectUrl');
exports.LOGGER = new core_1.InjectionToken('logger');
let SimpleNgWebSocket = class SimpleNgWebSocket extends events_1.EventEmitter {
    constructor(url, logger) {
        super();
        this.queue = [];
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
    connect() {
        this.close();
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
    close(code, reason) {
        if (this.ws) {
            this.ws.close(code, reason);
        }
    }
    send(message, toJson = true) {
        if (toJson) {
            message = JSON.stringify(message);
        }
        this.queue.push(message);
        if (this.ws.readyState === WebSocket.OPEN) {
            this.fireQueue();
        }
        else if (this.ws.readyState !== WebSocket.CONNECTING) {
            this.connect();
        }
    }
    fireQueue() {
        while (this.queue.length > 0) {
            const message = this.queue.shift();
            this.ws.send(message);
            this.logger('info', `SEND ${message}`);
        }
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    removeListener(event, listener) {
        return super.removeListener(event, listener);
    }
};
SimpleNgWebSocket = __decorate([
    (0, core_1.Injectable)(),
    __param(0, (0, core_1.Inject)(exports.CONNECT_URL)),
    __param(0, (0, core_1.Optional)()),
    __param(1, (0, core_1.Inject)(exports.LOGGER)),
    __param(1, (0, core_1.Optional)()),
    __metadata("design:paramtypes", [String, Function])
], SimpleNgWebSocket);
exports.SimpleNgWebSocket = SimpleNgWebSocket;
//# sourceMappingURL=index.js.map