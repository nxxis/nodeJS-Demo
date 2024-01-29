const express = require('express');
const mongoose = require('../db/mongoose');
const router = new express.Router();
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} = require('../controllers/productController');

router.post('/products', createProduct);

router.get('/products', fetchAllProducts);

router.get('/products/:id', fetchProductById);

router.patch('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.delete('/products', deleteAllProducts);

module.exports = router;
