import { RabbitMqAdapter } from '../adapters/rabbitmqAdapter';

const messageQueue = new RabbitMqAdapter('amqp://ingestion-queue');

async function sendMessage(queue: string, message: string): Promise<void> {
  await messageQueue.sendMessage(queue, message);
}

async function consume(queue: string, onMessage: (message: string) => void): Promise<void> {
  await messageQueue.consume(queue, onMessage);
}

export default {
  sendMessage,
  consume,
};  