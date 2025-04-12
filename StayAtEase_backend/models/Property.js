module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      status: { // available/unavailable
        type: DataTypes.ENUM('available', 'unavailable'),
        defaultValue: 'available',
      },
      images: { type: DataTypes.ARRAY(DataTypes.STRING) },
    });
  
    return Property;
  };
  