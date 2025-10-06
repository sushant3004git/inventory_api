import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStockProducts
} from '../controllers/productController.js';

const router = express.Router();


router.get('/low-stock', getLowStockProducts);


router.route('/')
  .post(createProduct)
  .get(getProducts);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);


router.post('/:id/increase', increaseStock);
router.post('/:id/decrease', decreaseStock);

export default router;
