const mongoose = require('mongoose');

const fundRequestSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  reason: String,
  description: String,
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  expectedDate: Date,
  requestDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

module.exports = mongoose.model('HospitalFundRequest', fundRequestSchema);
