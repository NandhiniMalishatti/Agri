const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Tractor', 'Agricultural Labour'],
  },
  workType: {
    type: String,
    required: true,
    enum: ['Ploughing', 'Sowing', 'Harvesting', 'Weeding', 'Spraying', 'Irrigation', 'Fertilizer Application', 'Other'],
  },
  location: {
    village: { type: String, required: true },
    mandal: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
  },
  acres: {
    type: Number,
    required: true,
    min: 0.1,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  estimatedHours: {
    type: Number,
    required: true,
    min: 1,
  },
  numberOfLabourers: {
    type: Number,
    default: 0,
  },
  paymentOffered: {
    type: Number,
    required: true,
    min: 1,
  },
  additionalNotes: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
