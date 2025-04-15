const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/login", adminController.loginAdmin);
router.put("/profile", verifyToken, adminController.updateProfile);
router.put("/change-password", verifyToken, adminController.changePassword);

module.exports = router;
