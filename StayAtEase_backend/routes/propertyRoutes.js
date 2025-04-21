const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { verifyToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get("/", propertyController.getAllProperties);
router.get("/property/:id", propertyController.getPropertyById);

router.get('/admin/all', verifyToken, propertyController.getAllPropertiesForAdmin);


// Property Owner routes
router.post("/create", verifyToken, requireRole("Property_Owner"), propertyController.createProperty);
router.get("/my", verifyToken, requireRole("Property_Owner"), propertyController.getMyProperties);
router.put("/update/:p_id", verifyToken, requireRole("Property_Owner"), propertyController.updateProperty);
router.put("/unavailable/:p_id", verifyToken, requireRole("Property_Owner"), propertyController.markPropertyUnavailable);
router.patch("/available/:p_id", verifyToken, requireRole("Property_Owner"), propertyController.markPropertyAvailable);

// Admin routes
router.get("/admin", verifyToken, requireRole("admin"), propertyController.getAllPropertiesAdmin);
router.delete("/delete/:p_id", verifyToken, requireRole("admin"), propertyController.deletePropertyByAdmin);

// Image upload route
router.post("/upload-images", verifyToken, upload.array('images', 8), propertyController.uploadImages);


module.exports = router;
