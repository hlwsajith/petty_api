const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      // Verify the token
      //   verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const products = await Product.find();

      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const {
        imageUrl,
        name,
        category,
        price,
        description,
        condition,
        sellerName,
        sellerContact,
        ratingCount,
      } = req.body;
      const newProduct = new Product({
        imageUrl,
        name,
        category,
        price,
        description,
        condition,
        sellerName,
        sellerContact,
        ratingCount,
      });

      await newProduct.save();
      console.log("====================================");
      console.log(newProduct);
      console.log("====================================");
      res.status(201).json(newProduct);
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.status(400).json({ message: err.message });
    }
  },

  searchProducts: async (req, res) => {
    try {
      const searchQuery = req.query.query;

      const regex = new RegExp(searchQuery, "i");

      // Search products based on the filter
      const products = await Product.find({
        $or: [
          { name: regex },
          { sellerName: regex },
          // Add other fields as needed
        ],
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOneProduct: async (req, res) => {
    try {
      const { productId } = req.query; // Get the animalId from the request parameters

      // Query the database to find the animal with the given animalId
      const product = await Product.findOne({ productId: productId });

      // Check if the animal exists
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editProduct: async (req, res) => {
    try {
      // Get the product ID from the request parameters
      const productId = req.body.productId;

      // Find the product by ID
      const product = await Product.findOne({ productId: productId });

      // Check if the product exists
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update the product properties based on the request body
      if (req.body.imageUrl) {
        product.imageUrl = req.body.imageUrl;
      }
      if (req.body.name) {
        product.name = req.body.name;
      }
      if (req.body.category) {
        product.category = req.body.category;
      }
      if (req.body.price) {
        product.price = req.body.price;
      }
      if (req.body.description) {
        product.description = req.body.description;
      }
      if (req.body.condition) {
        product.condition = req.body.condition;
      }
      if (req.body.sellerName) {
        product.sellerName = req.body.sellerName;
      }
      if (req.body.sellerContact) {
        product.sellerContact = req.body.sellerContact;
      }
      if (req.body.ratingCount) {
        product.ratingCount = req.body.ratingCount;
      }

      // Save the updated product
      await product.save();
      console.log("====================================");
      console.log(product);
      console.log("====================================");
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.query.productId; // Get the animalId from the request parameters

      // Query the database to find the animal with the given animalId
      const deletedProduct = await Product.deleteOne({ productId: productId });
      console.log("====================================");
      console.log(deletedProduct);
      console.log("====================================");
      // Check if the animal exists
      if (deletedProduct) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
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

module.exports = ProductController;
