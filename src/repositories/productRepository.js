const Product = require('../models/product');

const createProduct = async (newProduct) => {
  const product = new Product({
    ...newProduct,
  });
  return await product.save();
};

const fetchAllProducts = async () => {
  const products = await Product.find({});
  return products;
};

const fetchProductById = async (_id) => {
  const product = await Product.findById({ _id });
  return product;
};

const updateProduct = async (_id, updatedProduct) => {
  const product = await Product.findByIdAndUpdate(
    { _id },
    {
      ...updatedProduct,
    }
  );
  return await product.save();
};

const deleteProduct = async (_id) => {
  const product = await Product.findByIdAndDelete({ _id });
  return product;
};

const deleteAllProducts = async () => {
  const product = await Product.deleteMany({});
  return product;
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
