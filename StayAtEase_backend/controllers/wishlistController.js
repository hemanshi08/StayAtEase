// controllers/wishlistController.js
const { Wishlist } = require("../models");

exports.addToWishlist = async (req, res) => {
  try {
    const { p_id } = req.body;
    const u_id = req.user.u_id;

    // Check if already wishlisted
    const exists = await Wishlist.findOne({ where: { u_id, p_id } });
    if (exists) return res.status(400).json({ error: "Already in wishlist" });

    const newWish = await Wishlist.create({ u_id, p_id });
    res.status(201).json(newWish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserWishlist = async (req, res) => {
  try {
    const u_id = req.user.u_id;
    const wishlist = await Wishlist.findAll({ where: { u_id }, include: ["Property"] });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { p_id } = req.body;
    const u_id = req.user.u_id;
    await Wishlist.destroy({ where: { u_id, p_id } });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
