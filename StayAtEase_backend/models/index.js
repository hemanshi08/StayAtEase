const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')(sequelize, DataTypes);
const Admin = require('./Admin')(sequelize, DataTypes);
const Property = require('./Property')(sequelize, DataTypes);

// One property is posted by one user
User.hasMany(Property, { foreignKey: 'ownerId' });
Property.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = { sequelize, User, Admin, Property };
