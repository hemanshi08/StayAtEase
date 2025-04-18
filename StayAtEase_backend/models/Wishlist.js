// models/Wishlist.js
module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define("Wishlist", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      u_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return Wishlist;
  };
  