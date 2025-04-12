module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { // 'tenant' or 'owner'
      type: DataTypes.ENUM('tenant', 'owner'),
      allowNull: false,
    }
  });

  return User;
};
