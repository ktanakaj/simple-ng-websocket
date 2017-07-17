"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var events_1 = require("events");
var core_1 = require("@angular/core");
exports.CONNECT_URL = new core_1.OpaqueToken('connectUrl');
exports.LOGGER = new core_1.OpaqueToken('logger');
var SimpleNgWebSocket = (function (_super) {
    __extends(SimpleNgWebSocket, _super);
    function SimpleNgWebSocket(url, logger) {
        var _this = _super.call(this) || this;
        _this.queue = [];
        if (!url) {
            url = 'ws';
            if (window.location.protocol === 'https:') {
                url += 's';
            }
            url += '://' + window.location.host + '/';
        }
        _this.url = url;
        _this.logger = logger || (function () { });
        _this.connect();
        return _this;
    }
    SimpleNgWebSocket.prototype.connect = function () {
        var _this = this;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = function (ev) {
            _this.logger('info', 'OPEN');
            _this.emit('open', ev, _this);
            _this.fireQueue();
        };
        this.ws.onclose = function (ev) {
            _this.logger('info', "CLOSE " + ev.reason);
            _this.emit('close', ev, _this);
        };
        this.ws.onmessage = function (ev) {
            _this.logger('info', "RECEIVE " + ev.data);
            _this.emit('message', ev, _this);
        };
        this.ws.onerror = function (ev) {
            _this.logger('error', "ERROR");
            _this.emit('error', ev, _this);
        };
    };
    SimpleNgWebSocket.prototype.send = function (message, toJson) {
        if (toJson === void 0) { toJson = true; }
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
    };
    SimpleNgWebSocket.prototype.fireQueue = function () {
        while (this.queue.length > 0) {
            var message = this.queue.shift();
            this.ws.send(message);
            this.logger('info', "SEND " + message);
        }
    };
    SimpleNgWebSocket.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.prototype.emit.apply(this, [event].concat(args));
    };
    SimpleNgWebSocket.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    SimpleNgWebSocket.prototype.once = function (event, listener) {
        return _super.prototype.once.call(this, event, listener);
    };
    SimpleNgWebSocket.prototype.removeListener = function (event, listener) {
        return _super.prototype.removeListener.call(this, event, listener);
    };
    SimpleNgWebSocket = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.CONNECT_URL)), __param(0, core_1.Optional()), __param(1, core_1.Inject(exports.LOGGER)), __param(1, core_1.Optional()),
        __metadata("design:paramtypes", [String, Function])
    ], SimpleNgWebSocket);
    return SimpleNgWebSocket;
}(events_1.EventEmitter));
exports.SimpleNgWebSocket = SimpleNgWebSocket;
//# sourceMappingURL=index.js.map