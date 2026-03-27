const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create appointment
router.post('/book', async (req,res)=>{
  try{
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// Get user appointments
router.get('/user/:userId', async (req,res)=>{
  try{
    const appointments = await Appointment.find({ userId: req.params.userId });
    res.json(appointments);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
