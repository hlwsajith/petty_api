const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
  Breed: {
    type: String,
  },
  Description: {
    type: String,
  },
  Temperament: {
    type: String,
  },
  AverageLifespan: {
    type: String,
  },
  Origin: {
    type: String,
  },
});

const Breeds = mongoose.model("Breeds", breedSchema);

module.exports = Breeds;
