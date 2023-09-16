const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
  condition: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  sellerContact: {
    type: String,
    required: true,
  },
  ratingCount: {
    type: String,
  },
});

// Add a pre-save middleware to auto-generate productId
productSchema.pre("save", function (next) {
  // 'this' refers to the current document being saved
  if (!this.productId) {
    // Generate productId based on your logic (e.g., a unique ID, timestamp, etc.)
    // For example, using a timestamp and a random number:
    this.productId =
      Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
