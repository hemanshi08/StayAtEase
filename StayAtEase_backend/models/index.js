const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, DataTypes);
db.Property = require('./Property')(sequelize, DataTypes);
db.Admin = require('./Admin')(sequelize, DataTypes);
db.Review = require('./Review')(sequelize, DataTypes);
db.Inquiry = require('./Inquiry')(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
