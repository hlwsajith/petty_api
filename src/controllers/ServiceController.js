const Service = require("../models/Service");
const jwt = require("jsonwebtoken");

const ServiceController = {
  getAllServices: async (req, res) => {
    try {
      // Verify the token
    //   verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const services = await Service.find();
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createService: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const { username, email, password } = req.body;
      const newService = new Service({ username, email, password });
      
      await newService.save();
      res.status(201).json(newService);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  searchServices: async (req, res) => {
    try {
      const searchQuery = req.query.query;

      const regex = new RegExp(searchQuery, "i");

      // Search products based on the filter
      const services = await Service.find({
        $or: [
          { name: regex },
          { description: regex },
          // Add other fields as needed
        ],
      });
      res.json(services);
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

module.exports = ServiceController;
