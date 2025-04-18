const express = require("express");
const router = express.Router();
const { createOrUpdateReview,addOrUpdateReview, getReviewsByProperty, deleteReview,getAllReviewsForOwner } = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Add or update a review (protected route - only tenants)
router.post(
    '/',
    verifyToken,
    requireRole('tenant'),
   addOrUpdateReview
  );

// Owner, Tenant, Admin can fetch reviews for a property
router.get('/property/:id', verifyToken, requireRole('Property_Owner'), getReviewsByProperty);

// Admin can delete review
// router.get('/',verifyToken , reviewController.getAllReviews);
router.delete("/:r_id", verifyToken, requireRole("admin"), deleteReview);

// router.get('/property/:p_id', reviewController.getReviewsByPropertyId);

router.get("/owner-reviews", verifyToken,requireRole("Property_Owner"), getAllReviewsForOwner);

module.exports = router;
