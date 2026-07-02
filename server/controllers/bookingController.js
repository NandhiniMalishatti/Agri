const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (Farmer)
const createBooking = async (req, res) => {
  try {
    const {
      serviceType,
      workType,
      location,
      acres,
      date,
      startTime,
      estimatedHours,
      numberOfLabourers,
      paymentOffered,
      additionalNotes,
    } = req.body;

    const booking = new Booking({
      farmer: req.user._id,
      serviceType,
      workType,
      location,
      acres,
      date,
      startTime,
      estimatedHours,
      numberOfLabourers,
      paymentOffered,
      additionalNotes,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all available bookings for Tractor Owner or Labourer
// @route   GET /api/bookings/available
// @access  Private (Tractor Owner, Labourer)
const getAvailableBookings = async (req, res) => {
  try {
    const userRole = req.user.role;
    let serviceType = '';
    
    if (userRole === 'Tractor Owner') {
      serviceType = 'Tractor';
    } else if (userRole === 'Labourer') {
      serviceType = 'Agricultural Labour';
    } else {
      return res.status(403).json({ message: 'Not authorized to view available bookings' });
    }

    const bookings = await Booking.find({ serviceType, status: 'Pending' })
      .populate('farmer', 'name phone address');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get farmer's own bookings
// @route   GET /api/bookings/my
// @access  Private (Farmer)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ farmer: req.user._id })
      .populate('acceptedBy', 'name phone');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get provider's accepted bookings
// @route   GET /api/bookings/accepted
// @access  Private (Tractor Owner, Labourer)
const getAcceptedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ acceptedBy: req.user._id })
      .populate('farmer', 'name phone location');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept a booking
// @route   PUT /api/bookings/:id/accept
// @access  Private (Tractor Owner, Labourer)
const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Booking is no longer available' });
    }

    booking.status = 'Accepted';
    booking.acceptedBy = req.user._id;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private (Farmer)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'Cancelled';
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Complete a booking
// @route   PUT /api/bookings/:id/complete
// @access  Private (Farmer)
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'Completed';
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getAvailableBookings,
  getMyBookings,
  getAcceptedBookings,
  acceptBooking,
  cancelBooking,
  completeBooking
};
