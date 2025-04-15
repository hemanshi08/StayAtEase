const { Review, Property ,User } = require("../models");

// Tenant creates or updates review
exports.createOrUpdateReview = async (req, res) => {
  try {
    const { u_id } = req.user; // From token
    const { p_id, rating, review } = req.body;

    const existing = await Review.findOne({ where: { u_id, p_id } });

    if (existing) {
      existing.rating = rating;
      existing.review = review;
      await existing.save();
      return res.status(200).json({ message: "Review updated", review: existing });
    }

    const newReview = await Review.create({ u_id, p_id, rating, review });
    res.status(201).json({ message: "Review created", review: newReview });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
