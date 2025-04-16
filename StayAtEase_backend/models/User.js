module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    u_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    profile_pic: {
      type: DataTypes.STRING,
      
      defaultValue: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.STRING, allowNull: false, defaultValue: 'tenant' },
    user_address: { type: DataTypes.STRING },
    bio: { 
      type: DataTypes.STRING, 
      defaultValue: 'Welcome to my profile! I am excited to be part of the StayAtEase community.' 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'inactive'
      // You can update this to 'active' manually in controller after email verification
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Property, { foreignKey: 'u_id' });
    User.hasMany(models.Review, { foreignKey: 'u_id' });
    User.hasMany(models.Inquiry, { foreignKey: 'u_id' });
  };

  return User;
};
