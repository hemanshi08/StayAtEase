// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const wishlistController = require("../controllers/wishlistController");

router.post("/", verifyToken, wishlistController.addToWishlist);
router.get("/", verifyToken, wishlistController.getUserWishlist);
router.delete("/", verifyToken, wishlistController.removeFromWishlist);

module.exports = router;
