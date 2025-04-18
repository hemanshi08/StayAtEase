module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      p_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      property_images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      address: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      no_of_beds: { type: DataTypes.INTEGER, allowNull: false },
      no_of_bathrooms: { type: DataTypes.INTEGER, allowNull: false },
      sq_ft: { type: DataTypes.FLOAT, allowNull: false },
      about: { type: DataTypes.TEXT },
      property_type: { type: DataTypes.STRING, allowNull: false },
      amenities: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      status: { type: DataTypes.STRING, defaultValue: 'Available' },
      u_id: { type: DataTypes.INTEGER, allowNull: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
  
    Property.associate = (models) => {
      Property.belongsTo(models.User, { foreignKey: 'u_id' });
      Property.hasMany(models.Review, { foreignKey: 'p_id' });
      Property.hasMany(models.Inquiry, { foreignKey: 'p_id' });
    };
  
    return Property;
  };
  