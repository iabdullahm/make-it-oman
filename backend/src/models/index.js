const sequelize = require('../config/database');
const User = require('./User');
const Manufacturer = require('./Manufacturer');
const Product = require('./Product');

// ============================================
// DEFINE RELATIONSHIPS
// ============================================

// User -> Manufacturer (1:1)
User.hasOne(Manufacturer, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Manufacturer.belongsTo(User, {
  foreignKey: 'userId'
});

// Manufacturer -> Products (1:N)
Manufacturer.hasMany(Product, {
  foreignKey: 'manufacturerId',
  onDelete: 'CASCADE'
});
Product.belongsTo(Manufacturer, {
  foreignKey: 'manufacturerId'
});

// ============================================
// EXPORT
// ============================================

module.exports = {
  sequelize,
  User,
  Manufacturer,
  Product
};
