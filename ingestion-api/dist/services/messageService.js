"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmqAdapter_1 = require("../adapters/rabbitmqAdapter");
const messageQueue = new rabbitmqAdapter_1.RabbitMqAdapter('amqp://ingestion-queue');
function sendMessage(queue, message) {
    return __awaiter(this, void 0, void 0, function* () {
        yield messageQueue.sendMessage(queue, message);
    });
}
function consume(queue, onMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield messageQueue.consume(queue, onMessage);
    });
}
exports.default = {
    sendMessage,
    consume,
};
