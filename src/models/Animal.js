const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  animalId: {
    type: String,
    unique: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  animalName: {
    type: String,
  },
  specie: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  markings: {
    type: String,
    required: true,
  },
  nstatus: {
    type: String,
    required: true,
  },
  vaccination: {
    type: String,
    required: true,
  },
  SpecialMedicalNeeds: {
    type: String,
    required: true,
  },
  temperament: {
    type: String,
    required: true,
  },
  behavioralIssues: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  storyOfAnimal: {
    type: String,
    required: true,
  },
  adopterRequirements: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

// Add a pre-save middleware to auto-generate productId
animalSchema.pre("save", function (next) {
  // 'this' refers to the current document being saved
  if (!this.animalId) {
    // Generate productId based on your logic (e.g., a unique ID, timestamp, etc.)
    // For example, using a timestamp and a random number:
    this.animalId =
      Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }
  next();
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
