const express = require("express");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");
const User = require("../models/User");
const Seller = require("../models/Seller");
const Vet = require("../models/Vet");
const Admins = require("../models/Admins");
const app = express();

// const authMiddleware = (req, res, next) => {
//   // Authentication logic
//   const authToken = req.headers.authorization;

//   if (!authToken) {
//     return res.status(401).json({ message: 'Access token not provided' });
//   }

//   // Verify the access token
//   try {
//     // Verify and decode the token using the secret key
//     const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

//     // Attach the decoded token to the request object for future use
//     req.user = decodedToken;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid access token' });
//   }
// };

const AuthController = {
  // Sample route for generating a JWT token after successful authentication
  Login: async (req, res) => {
    // Perform user authentication logic
    // Assuming the authentication is successful and user data is available
    // Retrieve the username and password from the request body
    const { username, password } = req.body;

    try {
      // Find the user in the MongoDB collection
      const user = await User.findOne({ username });

      // Check if the user exists and the password matches
      if (user.username == username && user.password === password) {
        // Generate a JWT token
        const token = generateToken(user);

        // Return the token in the response
        return res.json({ token });
      }

      // If authentication fails, return an error response
      res.status(401).json({ message: "Invalid username or password" });
    } catch (error) {
      // Handle any errors that occur during the authentication process
      res.status(500).json({ message: "Internal server error" });
    }
  },

  SellerLogin: async (req, res) => {
    // Perform user authentication logic
    // Assuming the authentication is successful and user data is available
    // Retrieve the username and password from the request body
    const { sellername, password } = req.body;

    try {
      // Find the user in the MongoDB collection
      const seller = await Seller.findOne({ sellername });

      // Check if the user exists and the password matches
      if (seller.sellername == sellername && seller.password === password) {
        // Generate a JWT token
        const token = generateToken(seller);

        // Return the token in the response
        return res.json({ token });
      }

      // If authentication fails, return an error response
      res.status(401).json({ message: "Invalid sellername or password" });
    } catch (error) {
      // Handle any errors that occur during the authentication process
      res.status(500).json({ message: "Internal server error" });
    }
  },

  VetLogin: async (req, res) => {
    // Perform user authentication logic
    // Assuming the authentication is successful and user data is available
    // Retrieve the username and password from the request body
    const { vetname, password } = req.body;

    try {
      // Find the user in the MongoDB collection
      const vet = await Vet.findOne({ vetname });

      // Check if the user exists and the password matches
      if (vet.vetname == vetname && vet.password === password) {
        // Generate a JWT token
        const token = generateToken(vet);

        // Return the token in the response
        return res.json({ token });
      }

      // If authentication fails, return an error response
      res.status(401).json({ message: "Invalid vetname or password" });
    } catch (error) {
      // Handle any errors that occur during the authentication process
      res.status(500).json({ message: "Internal server error" });
    }
  },

  AdminLogin: async (req, res) => {
    // Perform user authentication logic
    // Assuming the authentication is successful and user data is available
    // Retrieve the username and password from the request body
    const { adminname, password } = req.body;

    try {
      // Find the user in the MongoDB collection
      const admin = await Admins.findOne({ adminname });

      // Check if the user exists and the password matches
      if (admin.adminname == adminname && admin.password === password) {
        // Generate a JWT token
        const token = generateToken(admin);

        // Return the token in the response
        return res.json({ token });
      }
console.log('====================================');
console.log(token);
console.log('====================================');
      // If authentication fails, return an error response
      res.status(401).json({ message: "Invalid admin or password" });
    } catch (error) {
      // Handle any errors that occur during the authentication process
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = AuthController;
