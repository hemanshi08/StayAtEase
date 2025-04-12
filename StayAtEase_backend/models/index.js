// models/index.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const db = {}; // this will store all models

db.db = sequelize; // 👈 add this line to export sequelize instance

// Load models
db.User = require('./User')(sequelize, DataTypes);
db.Property = require('./Property')(sequelize, DataTypes);
db.Admin = require('./Admin')(sequelize, DataTypes);
db.Review = require('./Review')(sequelize, DataTypes);
db.Inquiry = require('./Inquiry')(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Property, { foreignKey: 'u_id' });
db.Property.belongsTo(db.User, { foreignKey: 'u_id' });

db.User.hasMany(db.Review, { foreignKey: 'u_id' });
db.Property.hasMany(db.Review, { foreignKey: 'p_id' });
db.Review.belongsTo(db.User, { foreignKey: 'u_id' });
db.Review.belongsTo(db.Property, { foreignKey: 'p_id' });

db.User.hasMany(db.Inquiry, { foreignKey: 'u_id' });
db.Property.hasMany(db.Inquiry, { foreignKey: 'p_id' });
db.Inquiry.belongsTo(db.User, { foreignKey: 'u_id' });
db.Inquiry.belongsTo(db.Property, { foreignKey: 'p_id' });

module.exports = db;
