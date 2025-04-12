const express = require("express");
const { createInquiry, getInquiriesByProperty } = require("../controllers/inquiryController");
const router = express.Router();

router.post("/", createInquiry);
router.get("/:p_id", getInquiriesByProperty);

module.exports = router;
