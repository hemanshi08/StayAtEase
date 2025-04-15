module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    r_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    rating: { type: DataTypes.FLOAT, allowNull: false }, 
    review: { type: DataTypes.TEXT, allowNull: false },
    u_id: { type: DataTypes.INTEGER, allowNull: false },
    p_id: { type: DataTypes.INTEGER, allowNull: false }
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'u_id' });
    Review.belongsTo(models.Property, { foreignKey: 'p_id' });
  };

  return Review;
};
