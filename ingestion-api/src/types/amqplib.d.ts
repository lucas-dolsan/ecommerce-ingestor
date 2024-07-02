declare module 'amqplib' {
  import { EventEmitter } from 'events';

  export interface Options {
    channelMax?: number;
    frameMax?: number;
    heartbeat?: number;
    vhost?: string;
    authMechanism?: string | string[];
  }

  export interface Connection extends EventEmitter {
    createChannel(): Promise<Channel>;
    createConfirmChannel(): Promise<Channel>;
    close(): Promise<void>;
  }

  export interface Channel extends EventEmitter {
    assertQueue(queue: string, options?: any): Promise<any>;
    sendToQueue(queue: string, content: Buffer, options?: any): boolean;
    consume(queue: string, onMessage: (msg: Message | null) => void, options?: any): Promise<any>;
    ack(message: Message): void;
    close(): Promise<void>;
  }

  export interface Message {
    content: Buffer;
    fields: any;
    properties: any;
  }

  export function connect(url: string, options?: Options): Promise<Connection>;
}
