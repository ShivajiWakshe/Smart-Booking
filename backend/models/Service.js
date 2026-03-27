const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: String,
  name: String,
  details: String,
  contact: String
});

module.exports = mongoose.model('Service', serviceSchema);
