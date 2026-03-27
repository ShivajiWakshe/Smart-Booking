const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceType: String,
  serviceName: String,
  specialist: String,
  date: String,
  time: String,
  status: { type: String, enum: ['new','upcoming','past'], default: 'new' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
