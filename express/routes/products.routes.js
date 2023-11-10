// Importa express y el modelo Product
import express from 'express';
import ProductController from '../controllers/ProductController.js';

// Crea el router
const productRouter = express.Router();

// Define las rutas para el CRUD de Productos
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.post('/', ProductController.createProduct);
productRouter.post('/seed', ProductController.loadRandomProducts);
productRouter.put('/:id', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProduct);

export default productRouter;
