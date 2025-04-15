const express = require("express");
const { registerUser, loginUser ,updateProfile ,changePassword} = require("../controllers/userController");
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
