const { default: mongoose } = require('mongoose');

require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  //   total: {
  //     type: Number,
  //     default: price * quantity,
  //   },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
