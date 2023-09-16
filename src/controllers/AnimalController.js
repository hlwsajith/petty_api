const Animal = require("../models/Animal");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");

const AnimalController = {
  getAllAnimals: async (req, res) => {
    try {
      // Verify the token
      //   verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const animals = await Animal.find();
      res.json(animals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllUserAnimals: async (req, res) => {
    try {
      // Verify the token
      const username = req.query.username;
      //   verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const animals = await Animal.find({ contactName: username });
      res.json(animals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createAnimal: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const {
        imageName,
        animalName,
        specie,
        gender,
        markings,
        nstatus,
        vaccination,
        SpecialMedicalNeeds,
        temperament,
        behavioralIssues,
        ageGroup,
        location,
        contactName,
        contactEmail,
        contactPhone,
        storyOfAnimal,
        adopterRequirements,
        tag,
      } = req.body;
      const newAnimal = new Animal({
        imageName,
        animalName,
        specie,
        gender,
        markings,
        nstatus,
        vaccination,
        SpecialMedicalNeeds,
        temperament,
        behavioralIssues,
        ageGroup,
        location,
        contactName,
        contactEmail,
        contactPhone,
        storyOfAnimal,
        adopterRequirements,
        tag,
      });
      await newAnimal.save();
      res.status(201).json(newAnimal);
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.status(400).json({ message: err.message });
    }
  },

  searchAnimals: async (req, res) => {
    try {
      const searchQuery = req.query.query;

      const regex = new RegExp(searchQuery, "i");

      // Search animals based on the filter
      const animals = await Animal.find({
        $or: [
          { animalName: regex },
          { specie: regex },
          { ageGroup: regex },
          { location: regex },
          { tag: regex },
          { gender: regex },
          // Add other fields as needed
        ],
      });
      res.json(animals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  searchUserAnimals: async (req, res) => {
    try {
      const searchQuery = req.query.query;
      const username = req.query.username;

      const regex = new RegExp(searchQuery, "i");

      // Search animals based on the filter
      const animals = await Animal.find({
        $and: [
          {
            $or: [
              { animalName: regex },
              { specie: regex },
              { ageGroup: regex },
              { location: regex },
              { tag: regex },
              { gender: regex },
              // Add other fields as needed
            ],
          },
          { contactName: username }, // Assuming there's a 'userId' field in your Animal model
        ],
      });
      res.json(animals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  filterAnimals: async (req, res) => {
    try {
      const { sortBy, sortOrder } = req.query; // Get the sorting parameters from the request query parameters

      let sortOptions = {};

      // Set the sorting options based on the input values
      if (sortBy === "specie") {
        sortOptions.animalName = sortOrder === "asc" ? 1 : -1;
      } else if (sortBy === "animalName") {
        sortOptions.specie = sortOrder === "asc" ? 1 : -1;
      } else if (sortBy === "location") {
        sortOptions.location = sortOrder === "asc" ? 1 : -1;
      }
      // Add other fields as needed
      const animals = await Animal.find({}).sort(sortOptions);

      res.json(animals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOneAnimal: async (req, res) => {
    try {
      const { animalid } = req.query; // Get the animalId from the request parameters

      // Query the database to find the animal with the given animalId
      const animal = await Animal.findOne({ animalId: animalid });

      // Check if the animal exists
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }

      res.json(animal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editAnimal: async (req, res) => {
    try {
      // Get the product ID from the request parameters
      const animalId = req.body.animalId;

      // Find the product by ID
      const animal = await Animal.findOne({ animalId: animalId });

      // Check if the product exists
      if (!animal) {
        return res.status(404).json({ message: "animal not found" });
      }

      // Update the product properties based on the request body
      if (req.body.imageName) {
        animal.imageName = req.body.imageName;
      }
      if (req.body.animalName) {
        animal.animalName = req.body.animalName;
      }
      if (req.body.specie) {
        animal.specie = req.body.specie;
      }
      if (req.body.gender) {
        animal.gender = req.body.gender;
      }
      if (req.body.markings) {
        animal.markings = req.body.markings;
      }
      if (req.body.nstatus) {
        animal.nstatus = req.body.nstatus;
      }
      if (req.body.vaccination) {
        animal.vaccination = req.body.vaccination;
      }
      if (req.body.SpecialMedicalNeeds) {
        animal.SpecialMedicalNeeds = req.body.SpecialMedicalNeeds;
      }
      if (req.body.temperament) {
        animal.temperament = req.body.temperament;
      }
      if (req.body.behavioralIssues) {
        animal.behavioralIssues = req.body.behavioralIssues;
      }
      if (req.body.ageGroup) {
        animal.ageGroup = req.body.ageGroup;
      }
      if (req.body.location) {
        animal.location = req.body.location;
      }
      if (req.body.contactName) {
        animal.contactName = req.body.contactName;
      }
      if (req.body.contactEmail) {
        animal.contactEmail = req.body.contactEmail;
      }
      if (req.body.contactPhone) {
        animal.contactPhone = req.body.contactPhone;
      }
      if (req.body.storyOfAnimal) {
        animal.storyOfAnimal = req.body.storyOfAnimal;
      }
      if (req.body.adopterRequirements) {
        animal.adopterRequirements = req.body.adopterRequirements;
      }
      if (req.body.tag) {
        animal.tag = req.body.tag;
      }

      // Save the updated animal
      await animal.save();
      console.log("====================================");
      console.log(animal);
      console.log("====================================");
      res.status(200).json(animal);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },

  deleteAnimal: async (req, res) => {
    try {
      const animalId = req.query.animalId; // Get the animalId from the request parameters

      // Query the database to find the animal with the given animalId
      const deletedAnimal = await Animal.deleteOne({ animalId: animalId });
      console.log("====================================");
      console.log(deletedAnimal);
      console.log("====================================");
      // Check if the animal exists
      if (deletedAnimal) {
        res.status(200).json({ message: "Animal deleted successfully" });
      } else {
        res.status(404).json({ message: "Animal not found" });
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

module.exports = AnimalController;
