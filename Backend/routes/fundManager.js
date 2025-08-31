const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // middleware to verify JWT & extract user info
const HospitalFundRequest = require('../models/HospitalFundRequest');

// Middleware to allow only fund manager
function fundManagerOnly(req, res, next) {
  console.log('User object in fundManagerOnly:', req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.user.role !== 'fund-manager') {
    return res.status(403).json({ message: 'Access denied, insufficient role' });
  }
  next();
}

// GET all fund requests (optional ?status filter)
router.get('/fund-requests', auth, fundManagerOnly, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const requests = await HospitalFundRequest.find(filter).sort({ requestDate: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Get fund requests error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT approve fund request
router.put('/fund-request/:id/approve', auth, fundManagerOnly, async (req, res) => {
  try {
    const request = await HospitalFundRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });
    request.status = 'approved';
    await request.save();
    res.json({ message: 'Request approved', request });
  } catch (err) {
    console.error('Approve request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT reject fund request
router.put('/fund-request/:id/reject', auth, fundManagerOnly, async (req, res) => {
  try {
    const request = await HospitalFundRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });
    request.status = 'rejected';
    await request.save();
    res.json({ message: 'Request rejected', request });
  } catch (err) {
    console.error('Reject request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
