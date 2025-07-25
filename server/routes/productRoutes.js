const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProductQuantity,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(protect, getProducts)
  .post(protect, createProduct);

router.route('/:id')
  .get(protect, getProduct)
  .delete(protect, deleteProduct);

router.route('/:id/quantity')
  .put(protect, updateProductQuantity);

module.exports = router;