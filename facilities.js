const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const facilityController = require('../controllers/facilityController');
const auth = require('../middleware/auth');

// Validation middleware
const facilityValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('sportType').isIn(['basketball', 'football', 'volleyball', 'cricket', 'badminton', 'table-tennis', 'swimming', 'gym', 'indoor-stadium']),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('bookingPrice').isFloat({ min: 0 }).withMessage('Booking price must be a positive number'),
    body('operatingHours.start').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid start time format'),
    body('operatingHours.end').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid end time format')
];

// Public routes
router.get('/', facilityController.getAllFacilities);
router.get('/:id', facilityController.getFacilityById);
router.get('/sport/:sportType', facilityController.getFacilitiesBySport);
router.get('/:id/availability', facilityController.checkAvailability);

// Protected routes (admin only)
router.post('/', auth, facilityValidation, facilityController.createFacility);
router.put('/:id', auth, facilityValidation, facilityController.updateFacility);
router.delete('/:id', auth, facilityController.deleteFacility);

module.exports = router; 