const express = require("express");
const router = express.Router();
const { createOrUpdateReview,addOrUpdateReview, getReviewsByProperty, deleteReview,getAllReviewsForOwner ,getAllReviews } = require("../controllers/reviewController");
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


// router.get('/property/:p_id', reviewController.getReviewsByPropertyId);

router.get("/owner-reviews", verifyToken,requireRole("Property_Owner"), getAllReviewsForOwner);

router.get('/admin-reviews', verifyToken, getAllReviews);
module.exports = router;