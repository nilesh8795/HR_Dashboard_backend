const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Pending', 'Rejected', 'Hired'],
    default: 'Pending'
  },
  experience: {
    type: Number,
    default: 0
  },
  resume: {
    type: String, 
    required: true
  },
  attendance: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present'
  }
}, {
  timestamps: true
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
