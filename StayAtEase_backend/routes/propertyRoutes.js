const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { verifyToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Public
router.get("/", propertyController.getAllProperties);

// Property Owner
router.post("/create", verifyToken, requireRole("Property_Owner"), propertyController.createProperty);
router.get("/my", verifyToken, requireRole("Property_Owner"), propertyController.getMyProperties);
router.put("/update/:p_id", verifyToken, requireRole("Property_Owner"), propertyController.updateProperty);
router.put("/unavailable/:p_id", verifyToken, requireRole("Property_Owner"), propertyController.markPropertyUnavailable);
router.patch("/available/:p_id", verifyToken, requireRole("Property_Owner"), propertyController.markPropertyAvailable);

// Admin
router.get("/admin", verifyToken, requireRole("admin"), propertyController.getAllPropertiesAdmin);
router.delete("/delete/:p_id", verifyToken, requireRole("admin"), propertyController.deletePropertyByAdmin);

module.exports = router;
