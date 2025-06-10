// routes/product.js
import express from 'express';
import { getProducts, getSingleProduct } from '../controller/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);

export default router;
