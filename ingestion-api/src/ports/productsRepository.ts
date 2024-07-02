import { Product } from '../types/product';

export interface ProductsRepository {
  insertProducts(products: Product[]): Promise<void>;
  getProductById(id: string): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
  updateProduct(id: string, product: Partial<Product>): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
