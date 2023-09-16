const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admins = mongoose.model('Admins', adminsSchema);

module.exports = Admins;
