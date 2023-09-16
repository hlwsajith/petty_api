const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/adoptme', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

module.exports = mongoose.connection;
