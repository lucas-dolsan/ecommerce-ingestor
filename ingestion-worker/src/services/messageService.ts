import { RabbitMqAdapter } from '../adapters/rabbitmqAdapter';

const ingestionQueueUrl = process.env.INGESTION_QUEUE_URL || 'amqp://ingestion-queue';
const messageQueue = new RabbitMqAdapter(ingestionQueueUrl);


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