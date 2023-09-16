const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  sellername: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
