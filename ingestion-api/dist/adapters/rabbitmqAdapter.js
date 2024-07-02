"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.RabbitMqAdapter = void 0;
const amqp = __importStar(require("amqplib"));
const MAX_RETRIES = 10;
const RETRY_INTERVAL = 1000;
function connectWithRetry(url) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                const connection = yield amqp.connect(url);
                console.log('Successfully connected to RabbitMQ');
                return connection;
            }
            catch (error) {
                console.error(`Failed to connect to RabbitMQ (attempt ${i + 1} of ${MAX_RETRIES})`);
                yield new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
            }
        }
        throw new Error('Unable to connect to RabbitMQ after multiple attempts');
    });
}
class RabbitMqAdapter {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    sendMessage(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connectWithRetry(this.connectionString);
            const channel = yield connection.createChannel();
            yield channel.assertQueue(queue, { durable: true });
            yield channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
            yield channel.close();
            yield connection.close();
        });
    }
    consume(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connectWithRetry(this.connectionString);
            const channel = yield connection.createChannel();
            yield channel.assertQueue(queue, { durable: true });
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg !== null) {
                    yield callback(msg.content.toString());
                    channel.ack(msg);
                }
            }));
        });
    }
}
exports.RabbitMqAdapter = RabbitMqAdapter;
