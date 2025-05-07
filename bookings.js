const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Validation middleware
const bookingValidation = [
    body('facility').isMongoId().withMessage('Invalid facility ID'),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid start time format'),
    body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid end time format'),
    body('participants').isInt({ min: 1 }).withMessage('Number of participants must be at least 1')
];

// All routes are protected (require authentication)
router.use(auth);

// Create new booking
router.post('/', bookingValidation, bookingController.createBooking);

// Get user's bookings
router.get('/my-bookings', bookingController.getUserBookings);

// Get specific booking
router.get('/:id', bookingController.getBookingById);

// Cancel booking
router.put('/:id/cancel', bookingController.cancelBooking);

module.exports = router; 