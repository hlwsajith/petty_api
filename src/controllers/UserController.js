const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      // Verify the token
      verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
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

module.exports = UserController;
