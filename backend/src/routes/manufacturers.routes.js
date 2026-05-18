const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { Manufacturer, Product, User } = require('../models');
const { Op } = require('sequelize');
const { AppError } = require('../middleware/errorHandler');

// ============================================
// LIST ALL MANUFACTURERS
// ============================================

router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status = 'verified', search, industryType } = req.query;
  const offset = (page - 1) * limit;

  const where = { status: status || 'verified' };
  if (industryType) where.industryType = industryType;
  if (search) {
    where[Op.or] = [
      { companyName: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } }
    ];
  }

  const { count, rows } = await Manufacturer.findAndCountAll({
    where,
    include: [{ model: User, attributes: ['email', 'fullName'] }],
    limit: parseInt(limit),
    offset,
    order: [['rating', 'DESC']]
  });

  res.status(200).json({
    success: true,
    data: {
      manufacturers: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    }
  });
}));

// ============================================
// GET MANUFACTURER BY ID
// ============================================

router.get('/:id', asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ['email', 'fullName'] },
      { model: Product, attributes: ['id', 'name', 'price', 'rating'] }
    ]
  });

  if (!manufacturer) {
    throw new AppError('Manufacturer not found', 404);
  }

  res.status(200).json({
    success: true,
    data: { manufacturer }
  });
}));

// ============================================
// CREATE MANUFACTURER
// ============================================

router.post('/', authenticate, authorize('manufacturer'), asyncHandler(async (req, res) => {
  const { registrationNumber, companyName, industryType, location, email, phone } = req.body;

  if (!registrationNumber || !companyName || !industryType || !location || !email || !phone) {
    throw new AppError('Missing required fields', 400);
  }

  // Check if already has a manufacturer profile
  const existing = await Manufacturer.findOne({ where: { userId: req.user.id } });
  if (existing) {
    throw new AppError('You already have a manufacturer profile', 409);
  }

  const manufacturer = await Manufacturer.create({
    userId: req.user.id,
    registrationNumber,
    companyName,
    industryType,
    location,
    email,
    phone
  });

  res.status(201).json({
    success: true,
    message: 'Manufacturer profile created',
    data: { manufacturer }
  });
}));

// ============================================
// UPDATE MANUFACTURER
// ============================================

router.put('/:id', authenticate, asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findByPk(req.params.id);

  if (!manufacturer) {
    throw new AppError('Manufacturer not found', 404);
  }

  if (manufacturer.userId !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  const updatedManufacturer = await manufacturer.update(req.body);

  res.status(200).json({
    success: true,
    message: 'Manufacturer updated successfully',
    data: { manufacturer: updatedManufacturer }
  });
}));

// ============================================
// GET MANUFACTURER'S PRODUCTS
// ============================================

router.get('/:id/products', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  const manufacturer = await Manufacturer.findByPk(req.params.id);
  if (!manufacturer) {
    throw new AppError('Manufacturer not found', 404);
  }

  const { count, rows } = await Product.findAndCountAll({
    where: { manufacturerId: req.params.id, status: 'active' },
    limit: parseInt(limit),
    offset
  });

  res.status(200).json({
    success: true,
    data: {
      products: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    }
  });
}));

module.exports = router;
