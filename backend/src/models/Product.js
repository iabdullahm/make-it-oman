const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  manufacturerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM(
      'textiles',
      'food_beverage',
      'chemicals',
      'machinery',
      'electronics',
      'construction',
      'agriculture',
      'other'
    ),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'OMR'
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: true
  },
  specifications: {
    type: DataTypes.JSON,
    defaultValue: {},
    allowNull: true
  },
  certifications: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: true
  },
  minimumOrderQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  leadTime: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'inactive', 'discontinued'),
    defaultValue: 'active'
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: { min: 0, max: 5 }
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['manufacturerId'] },
    { fields: ['category'] },
    { fields: ['status'] },
    { fields: ['name'] }
  ]
});

module.exports = Product;
