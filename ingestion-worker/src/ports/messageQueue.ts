export interface MessageQueue {
  sendMessage(queue: string, message: string): Promise<void>;
  consume(queue: string, callback: (message: string) => void): Promise<void>;
}