const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// middleware can be added to protect routes
router.post('/add', propertyController.createProperty);
router.get('/available', propertyController.getAvailableProperties);

module.exports = router;
