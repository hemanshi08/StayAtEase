// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const wishlistController = require("../controllers/wishlistController");


router.get("/", verifyToken, wishlistController.getUserWishlist);
router.post("/toggle", verifyToken, wishlistController.toggleWishlist);

module.exports = router;
