import { Request, Response } from 'express';
import { MongoDBAdapterImpl } from '../adapters/mongodbAdapter';
import { Product } from '../types/product';
import { ProductsDAO } from '../dao/productsDAO';

let productsDAO: ProductsDAO;

(async () => {
  const dbAdapter = await MongoDBAdapterImpl.getInstance(process.env.DB_HOST as string, process.env.DB_NAME as string);
  productsDAO = new ProductsDAO(dbAdapter);
})();

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    await productsDAO.insertProducts([product]);
    res.status(201).send(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await productsDAO.getProductById(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productsDAO.getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product: Partial<Product> = req.body;
    await productsDAO.updateProduct(id, product);
    res.status(200).send('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await productsDAO.deleteProduct(id);
    res.status(200).send('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
