const Breeds = require("../models/Breeds");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");

const BreedsController = {
  getOneBreed: async (req, res) => {
    try {
      const { breeds } = req.query; // Get the animalId from the request parameters

      // Query the database to find the animal with the given animalId
      const breed = await Breeds.findOne({ Breed: breeds });

      // Check if the animal exists
      if (!breed) {
        return res.status(404).json({ message: "breed not found" });
      }

      res.json(breed);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = BreedsController;
