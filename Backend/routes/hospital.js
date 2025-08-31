const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const HospitalFundRequest = require('../models/HospitalFundRequest');

// Submit new fund request
router.post('/fund-request', auth, async (req, res) => {
  try {
    if (req.userRole !== 'hospital') return res.status(403).json({ message: 'Forbidden' });

    const { amount, reason, description, urgency, expectedDate } = req.body;
    const newRequest = new HospitalFundRequest({
      hospitalId: req.userId,
      amount,
      reason,
      description,
      urgency,
      expectedDate,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Fund request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hospital's fund requests
router.get('/fund-requests', auth, async (req, res) => {
  try {
    if (req.userRole !== 'hospital') return res.status(403).json({ message: 'Forbidden' });

    const requests = await HospitalFundRequest.find({ hospitalId: req.userId }).sort({ requestDate: -1 });

    res.json(requests);
  } catch (err) {
    console.error('Get fund requests error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
