const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { verifyToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

// Tenant: Add inquiry
router.post('/', verifyToken, requireRole('tenant'),inquiryController.createInquiry);

// Property Owner: Get inquiries for their properties
router.get('/owner', verifyToken, requireRole('Property_Owner'), inquiryController.getOwnerInquiries);

// Admin: Get all inquiries
router.get('/admin', verifyToken, requireRole('admin'), inquiryController.getAllInquiries);

module.exports = router;
