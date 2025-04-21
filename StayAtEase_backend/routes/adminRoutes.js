const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");
const { getAdminProfile } = require('../controllers/adminController'); 
router.post("/login", adminController.loginAdmin);
router.get('/profile', authenticateAdmin, getAdminProfile);
router.put("/change-password", verifyToken, adminController.changePassword);

module.exports = router;
