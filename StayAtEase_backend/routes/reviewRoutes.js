const express = require("express");
const router = express.Router();
const { createOrUpdateReview, getReviewsByProperty, deleteReview,getAllReviewsForOwner } = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Tenant creates or updates a review
router.post("/add", verifyToken, requireRole("tenant"), createOrUpdateReview);

// Owner, Tenant, Admin can fetch reviews for a property
router.get('/property/:id', verifyToken, requireRole('Property_Owner'), getReviewsByProperty);

// Admin can delete review
// router.get('/',verifyToken , reviewController.getAllReviews);
router.delete("/:r_id", verifyToken, requireRole("admin"), deleteReview);

// router.get('/property/:p_id', reviewController.getReviewsByPropertyId);

router.get("/owner-reviews", verifyToken,requireRole("Property_Owner"), getAllReviewsForOwner);

module.exports = router;
