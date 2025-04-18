const express = require("express");
const { 
  registerUser, 
  loginUser, 
  updateProfile, 
  changePassword,
  getUserProfile 
} = require("../controllers/userController");
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile routes (protected)
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
