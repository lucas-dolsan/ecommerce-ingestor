import { DatabaseAdapter } from '../adapters/mongodbAdapter';
import { ProductsRepository } from '../ports/productsRepository';
import { Product } from '../types/product';
import { ObjectId } from 'mongodb';

export class ProductsDAO implements ProductsRepository {
  private dbAdapter: DatabaseAdapter;
  private collectionName = 'products';

  constructor(dbAdapter: DatabaseAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async insertProducts(products: Product[]): Promise<void> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    await collection.insertMany(products);
  }

  async getProductById(id: string): Promise<Product | null> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    const product = await collection.findOne({ _id: new ObjectId(id) });
    return product ? this.mapDocumentToProduct(product) : null;
  }

  async getAllProducts(): Promise<Product[]> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    const products = await collection.find({}).toArray();
    return products.map(this.mapDocumentToProduct);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: product });
  }

  async deleteProduct(id: string): Promise<void> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    await collection.deleteOne({ _id: new ObjectId(id) });
  }

  private mapDocumentToProduct(document: any): Product {
    return {
      id: document._id.toString(),
      name: document.name,
      description: document.description,
      price: document.price,
      quantity: document.quantity,
    };
  }
}
