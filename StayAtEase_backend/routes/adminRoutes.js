const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/login", adminController.loginAdmin);
router.patch('/admin-update',verifyToken ,adminController.updateAdminDetails);
router.patch('/admin-change-password', verifyToken ,adminController.changeAdminPassword);
router.get('/getdata', verifyToken, adminController.getCurrentAdmin);
module.exports = router;
