const express = require('express');
const Product = require('../models/product');
const mongoose = require('../db/mongoose');
const router = new express.Router();

// create product
router.post('/products', async (req, res) => {
  const product = new Product({
    ...req.body,
  });
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).send();
    }
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetch product by id
router.get('/products/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById({ _id });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update product
router.patch('/products/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate(
      { _id },
      {
        ...req.body,
      }
    );
    if (!product) {
      return res.status(404).send();
    }
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
});

// delete product
router.delete('/products/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete({ _id });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
});

// delete all products
router.delete('/products', async (req, res) => {
  try {
    const product = await Product.deleteMany({});
    res.send();
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
