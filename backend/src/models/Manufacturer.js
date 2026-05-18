const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Manufacturer = sequelize.define('Manufacturer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  registrationNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyLogo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  industryType: {
    type: DataTypes.ENUM(
      'textiles',
      'food_processing',
      'petrochemicals',
      'electronics',
      'machinery',
      'construction',
      'agriculture',
      'other'
    ),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yearEstablished: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  numberOfEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  productionCapacity: {
    type: DataTypes.STRING,
    allowNull: true
  },
  certifications: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'suspended', 'inactive'),
    defaultValue: 'pending'
  },
  verificationDate: {
    type: DataTypes.DATE,
    allowNull: true
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
  exportsToCountries: {
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
  timestamps: true
});

module.exports = Manufacturer;
