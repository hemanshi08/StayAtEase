const { Review, Property } = require('../models');

const updatePropertyRating = async (propertyId) => {
  const reviews = await Review.findAll({ where: { p_id: propertyId } });

  if (reviews.length === 0) return;

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  await Property.update(
    { average_rating: averageRating },
    { where: { id: propertyId } }
  );
};

module.exports = updatePropertyRating;
