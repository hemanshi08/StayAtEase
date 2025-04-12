const express = require("express");
const { createReview, getReviewsByProperty } = require("../controllers/reviewController");
const router = express.Router();

router.post("/", createReview);
router.get("/:p_id", getReviewsByProperty);

module.exports = router;
