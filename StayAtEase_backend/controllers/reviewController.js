const { Review } = require("../models");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReviewsByProperty = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { p_id: req.params.p_id } });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
