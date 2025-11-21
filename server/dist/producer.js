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
exports.sendMessage = sendMessage;
const amqp = require('amqplib');
function sendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqp.connect('amqp://localhost');
            const channel = yield connection.createChannel();
            const queue = "test_queue";
            yield channel.assertQueue(queue, { durable: true });
            const message = 'hello from node js';
            channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
            console.log("message sent");
            setTimeout(() => {
                channel.close();
                connection.close();
                process.exit(0);
            }, 500);
        }
        catch (error) {
            console.error('Error : ', error);
        }
    });
}
