const express = require("express");
const { createProperty, getAllProperties } = require("../controllers/propertyController");
const router = express.Router();

router.post("/", createProperty);
router.get("/", getAllProperties);

module.exports = router;
