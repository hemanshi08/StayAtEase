// controllers/wishlistController.js
// const { Wishlist } = require("../models");

const { Wishlist, Property , Review } = require("../models");

exports.toggleWishlist = async (req, res) => {
  try {
    const { p_id } = req.body;
    const u_id = req.user.id;

    const exists = await Wishlist.findOne({ where: { u_id, p_id } });

    if (exists) {
      await Wishlist.destroy({ where: { u_id, p_id } });
      return res.status(200).json({ message: "Removed from wishlist", status: "removed" });
    } else {
      const newWish = await Wishlist.create({ u_id, p_id });
      return res.status(201).json({ message: "Added to wishlist", status: "added", data: newWish });
    }
  } catch (err) {
    console.error("Toggle wishlist error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { u_id: req.user.id },
      include: [{
        model: Property,
        include: [{
          model: Review,
          attributes: ['rating'], // Only include what we need for rating calculation
          required: false // Include properties even if they have no reviews
        }]
      }]
    });

    // Format the response with average ratings
    const response = await Promise.all(wishlist.map(async (item) => {
      const property = item.Property.get({ plain: true });
      
      // Calculate average rating
      const reviews = property.Reviews || [];
      const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

      return {
        wishlistId: item.id,
        property: {
          ...property,
          avgRating: parseFloat(avgRating),
          // Remove Reviews array if you don't need it in final response
        }
      };
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error('Wishlist error:', err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

