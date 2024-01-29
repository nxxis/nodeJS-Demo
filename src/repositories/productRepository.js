const Product = require('../models/product');

const createProduct = async (newProduct) => {
  const product = new Product({
    ...newProduct,
  });
  return await product.save();
};

const fetchAllProducts = async () => await Product.find({});

const fetchProductById = async (_id) => await Product.findById({ _id });

const updateProduct = async (_id, updatedProduct) => {
  const product = await Product.findByIdAndUpdate(
    { _id },
    {
      ...updatedProduct,
    }
  );
  return await product.save();
};

const deleteProduct = async (_id) => await Product.findByIdAndDelete({ _id });

const deleteAllProducts = async () => await Product.deleteMany({});

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
