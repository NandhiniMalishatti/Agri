const express = require('express');
const router = express.Router();
const { getAdminStats, getAllUsers, deleteUser, getAllBookings } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Apply middleware to all routes in this file
router.use(protect);
router.use(authorizeRoles('Admin'));

router.get('/stats', getAdminStats);
router.route('/users')
  .get(getAllUsers);
router.route('/users/:id')
  .delete(deleteUser);
router.get('/bookings', getAllBookings);

module.exports = router;
