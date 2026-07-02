const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAvailableBookings,
  getMyBookings,
  getAcceptedBookings,
  acceptBooking,
  cancelBooking,
  completeBooking
} = require('../controllers/bookingController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorizeRoles('Farmer'), createBooking);

router.get('/available', protect, authorizeRoles('Tractor Owner', 'Labourer'), getAvailableBookings);
router.get('/my', protect, authorizeRoles('Farmer'), getMyBookings);
router.get('/accepted', protect, authorizeRoles('Tractor Owner', 'Labourer'), getAcceptedBookings);

router.put('/:id/accept', protect, authorizeRoles('Tractor Owner', 'Labourer'), acceptBooking);
router.put('/:id/cancel', protect, authorizeRoles('Farmer'), cancelBooking);
router.put('/:id/complete', protect, authorizeRoles('Farmer'), completeBooking);

module.exports = router;
