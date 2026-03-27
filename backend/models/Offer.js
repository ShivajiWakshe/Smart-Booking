const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  serviceType: String,
  description: String,
  validTill: String
});

module.exports = mongoose.model('Offer', offerSchema);
