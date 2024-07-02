import { MongoClient, Db } from 'mongodb';

export interface DatabaseAdapter {
  getDb(): Db;
}
export class MongoDBAdapterImpl implements DatabaseAdapter {
  private static instance: MongoDBAdapterImpl;
  private db?: Db;
  private client?: MongoClient;

  private constructor() {}

  static async getInstance(dbHost: string, dbName: string): Promise<MongoDBAdapterImpl> {
    if (!MongoDBAdapterImpl.instance) {
      MongoDBAdapterImpl.instance = new MongoDBAdapterImpl();
      await MongoDBAdapterImpl.instance.connect(dbHost, dbName);
    }
    return MongoDBAdapterImpl.instance;
  }

  private async connect(dbHost: string, dbName: string): Promise<void> {
    if (this.db) {
      return;
    }
    this.client = new MongoClient(dbHost);
    await this.client.connect();
    this.db = this.client.db(dbName);
    console.log(`Connected to MongoDB at ${dbHost}`);
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }
}
