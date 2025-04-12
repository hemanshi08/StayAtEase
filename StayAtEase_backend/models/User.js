module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    u_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // ✅ must be primary key
      autoIncrement: true
    },
    profile_pic: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.STRING, allowNull: false, defaultValue: 'tenant' },
    user_address: { type: DataTypes.STRING },
    bio: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'inactive' }
  });

  User.associate = (models) => {
    User.hasMany(models.Property, { foreignKey: 'u_id' });
    User.hasMany(models.Review, { foreignKey: 'u_id' });
    User.hasMany(models.Inquiry, { foreignKey: 'u_id' });
  };

  return User;
};
