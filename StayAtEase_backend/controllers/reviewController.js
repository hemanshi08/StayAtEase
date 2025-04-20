const { Review, Property ,User } = require("../models");
const updatePropertyRating = require('../utils/updatePropertyRating');
// Add or update a review (only for tenants)
// Add or update a review (only for tenants)


exports.addOrUpdateReview = async (req, res) => {
  try {
    console.log("User:", req.user); 
    if (req.user.userType !== 'tenant') {
      return res.status(403).json({ error: 'Only tenants can submit reviews' });
    }

    const { p_id, rating, review: comment } = req.body;
    console.log("Body:", req.body); 
    if (!p_id || !rating || rating < 1 || rating > 5 || !comment) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const property = await Property.findByPk(p_id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    let review = await Review.findOne({
      where: {
        p_id,
        u_id: req.user.id
      }
    });

    let isNew = false;

    if (review) {
      review.rating = rating;
      review.review = comment;
      review.date = new Date();
    } else {
      review = await Review.create({
        p_id,
        u_id: req.user.id,
        rating,
        review: comment
      });
      isNew = true;
    }

    await review.save();
    await updatePropertyRating(p_id);

    res.status(201).json({
      message: isNew ? 'Review added successfully' : 'Review updated successfully',
      review
    });

  } catch (error) {
    console.error('Error adding/updating review:', error); 
    res.status(500).json({ error: 'Server error' });
  }
};


// Get reviews for a property (Tenant, Owner, Admin)
// exports.getReviewsByProperty = async (req, res) => {
//   try {
//     const { id: p_id } = req.params;
//     const user = req.user;

//     const property = await Property.findByPk(p_id);
//     if (!property) {
//       return res.status(404).json({ error: "Property not found" });
//     }

//     // Role: Property Owner - can only see reviews for their own properties
//     if (user.userType === "Property_Owner") {
//       if (property.owner_id !== user.u_id) {
//         return res.status(403).json({ error: "Access denied: Not your property" });
//       }
//     }

//     // Get reviews with user information
//     const reviews = await Review.findAll({ 
//       where: { p_id },
//       include: [
//         { 
//           association: 'User',
//           attributes: ['u_id', 'name', 'email'] // Adjust attributes as needed
//         }
//       ],
//       order: [['date', 'DESC']]
//     });

//     res.status(200).json(reviews);
//   } catch (err) {
//     console.error("Error fetching reviews:", err);
//     res.status(500).json({ error: "Failed to fetch reviews" });
//   }
// };

exports.getReviewsByProperty = async (req, res) => {
  try {
    const { id: p_id } = req.params;
    const user = req.user;

    const property = await Property.findByPk(p_id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Role: Property Owner - can only see reviews for their own properties
    if (user.userType === "Property_Owner") {
      if (property.owner_id != user.u_id) {  // Changed !== to != for type coercion
        return res.status(403).json({ error: "Access denied: Not your property" });
      }
    }

    // Get reviews with user information
    const reviews = await Review.findAll({ 
      where: { p_id },
      include: [
        { 
          association: 'User',
          attributes: ['u_id', 'name', 'email']
        }
      ],
      order: [['date', 'DESC']]
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};


const getReviewsByPropertyId = async (req, res) => {
  const { p_id } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { p_id },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }], // Optional: include user who posted the review
      order: [['date', 'DESC']]
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};



// Admin deletes review


exports.deleteReview = async (req, res) => {
  try {
    const { r_id } = req.params;

    const review = await Review.findByPk(r_id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    await review.destroy();
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


 exports.getAllReviewsForOwner =  async (req, res) => {
  try {
    const userId = req.user.id; // Auth middleware gives this
    console.log("User ID from token:", userId);
    // Step 1: Find all property IDs owned by this user
    const properties = await Property.findAll({
      where: { u_id: userId },
      attributes: ['p_id']
    });

    const propertyIds = properties.map((prop) => prop.p_id);

    if (propertyIds.length === 0) {
      return res.status(200).json({ message: 'No properties found for this user.', reviews: [] });
    }

    // Step 2: Find all reviews for those properties
    const reviews = await Review.findAll({
      where: { p_id: propertyIds },
      include: [
        {
          model: Property,
          attributes: ['p_id', 'title', 'address'],
          required: true
        },
        {
          model: User,
          attributes: ['u_id', 'fullName', 'profile_pic'],
          required: true
        }
      ],
      order: [['date', 'DESC']]
    });

    res.status(200).json({ message: 'Reviews fetched successfully.', reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error while fetching reviews.', error: error.message });
  }
};

// Get all reviews (Admin/Super Admin view)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Property,
          attributes: ['p_id', 'title', 'address'],
          required: true
        },
        {
          model: User,
          attributes: ['u_id', 'fullName', 'profile_pic'],
          required: true
        }
      ],
      order: [['date', 'DESC']]
    });

    res.status(200).json({ message: 'All reviews fetched successfully.', reviews });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ message: 'Server error while fetching all reviews.', error: error.message });
  }
};
