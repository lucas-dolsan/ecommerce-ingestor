import { Router } from 'express';
import productController from '../controllers/productController';

const productRouter = Router();

productRouter.post('/', productController.createProduct);
productRouter.get('/:id', productController.getProductById);
productRouter.get('/', productController.getAllProducts);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

export default productRouter;
