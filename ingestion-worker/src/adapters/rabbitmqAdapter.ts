import * as amqp from 'amqplib';
import { MessageQueue } from '../ports/messageQueue';

const MAX_RETRIES = 10;
const RETRY_INTERVAL = 3000;

async function connectWithRetry(url: string): Promise<amqp.Connection> {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const connection = await amqp.connect(url);
      console.log('Successfully connected to RabbitMQ')
      return connection;
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ (attempt ${i + 1} of ${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
  throw new Error('Unable to connect to RabbitMQ after multiple attempts');
}

export class RabbitMqAdapter implements MessageQueue {
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async sendMessage(queue: string, message: string): Promise<void> {
    const connection = await connectWithRetry(this.connectionString);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    await channel.close();
    await connection.close();
  }

  async consume(queue: string, callback: (message: string) => void): Promise<void> {
    const connection = await connectWithRetry(this.connectionString);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        await callback(msg.content.toString());
        channel.ack(msg);
      }
    });
  }
}
