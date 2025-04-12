module.exports = (sequelize, DataTypes) => {
    const Inquiry = sequelize.define('Inquiry', {
      i_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      u_id: { type: DataTypes.INTEGER, allowNull: false },
      p_id: { type: DataTypes.INTEGER, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false }
    });
  
    Inquiry.associate = (models) => {
      Inquiry.belongsTo(models.User, { foreignKey: 'u_id' });
      Inquiry.belongsTo(models.Property, { foreignKey: 'p_id' });
    };
  
    return Inquiry;
  };
  