const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  vetId: {
    type: String,
    unique: true,
  },
  vetname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  vetcategory: {
    type: String,
    required: true,
  },
});

vetSchema.pre("save", function (next) {
  // 'this' refers to the current document being saved
  if (!this.vetId) {
    // Generate productId based on your logic (e.g., a unique ID, timestamp, etc.)
    // For example, using a timestamp and a random number:
    this.vetId =
      Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }
  next();
});

const Vet = mongoose.model("Vet", vetSchema);

module.exports = Vet;
