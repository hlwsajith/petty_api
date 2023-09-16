const Seller = require("../models/Seller");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");

const SellerController = {
  getAllSellers: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the seller information
      // For example, you can restrict access to certain actions based on the seller's role

      const sellers = await Seller.find();
      res.json(sellers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createSeller: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the seller information
      // For example, you can restrict access to certain actions based on the seller's role

      const { sellername, email, password } = req.body;
      const newSeller = new Seller({ sellername, email, password });

      await newSeller.save();
      res.status(201).json(newSeller);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  searchProducts: async (req, res) => {
    try {
      const searchQuery = req.query.query;
      const sellerName = req.query.username;

      const regex = new RegExp(searchQuery, "i");

      // Search products based on the filter
      const products = await Product.find({
        $and: [
          { sellerName }, // Match the provided username
          { $or: [{ name: regex }, { sellerName: regex }] }, // Apply search query on name and description
          // Add other fields as needed
        ],
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const sellerName = req.query.query;

      const products = await Product.find({ 
        $or: [
          { sellerName: sellerName }
          // Add other fields as needed
        ],
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

// Verify the access token
const verifyToken = (authToken) => {
  if (!authToken) {
    throw new Error("Access token not provided");
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    if (decodedToken.exp <= currentTimestamp) {
      throw new Error("Access token has expired");
    }
  } catch (err) {
    throw new Error("Invalid access token");
  }
};

module.exports = SellerController;
