// controllers/wishlistController.js
// const { Wishlist } = require("../models");

const { Wishlist, Property } = require("../models");

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
    const u_id = req.user.id;
    const wishlist = await Wishlist.findAll({ where: { u_id }, include: ["Property"] });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

