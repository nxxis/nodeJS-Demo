const productRepository = require('../repositories/productRepository');

const createProduct = async (req, res) => {
  try {
    const product = await productRepository.createProduct(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const products = await productRepository.fetchAllProducts();
    if (!products) {
      return res.status(404).send();
    }
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

const fetchProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await productRepository.fetchProductById(_id);
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await productRepository.updateProduct(_id, req.body);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteProduct = async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await productRepository.deleteProduct(_id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const product = await productRepository.deleteAllProducts();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
