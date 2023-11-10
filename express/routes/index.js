import express from 'express';
import productRouter from './products.routes.js';
const indexRouter = express.Router();

//? Endopoints here
indexRouter.use('/products', productRouter)


export default indexRouter;