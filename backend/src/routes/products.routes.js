const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { Product, Manufacturer } = require('../models');
const { Op } = require('sequelize');
const { AppError } = require('../middleware/errorHandler');

// ============================================
// LIST ALL PRODUCTS
// ============================================

router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, search, minPrice, maxPrice, status = 'active' } = req.query;
  const offset = (page - 1) * limit;

  const where = { status: status || 'active' };

  if (category) where.category = category;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = minPrice;
    if (maxPrice) where.price[Op.lte] = maxPrice;
  }
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
      { sku: { [Op.iLike]: `%${search}%` } }
    ];
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    include: [{ model: Manufacturer, attributes: ['companyName', 'rating', 'status'] }],
    limit: parseInt(limit),
    offset,
    order: [['rating', 'DESC'], ['createdAt', 'DESC']]
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

// ============================================
// GET PRODUCT BY ID
// ============================================

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [{ model: Manufacturer }]
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: { product }
  });
}));

// ============================================
// CREATE PRODUCT
// ============================================

router.post('/', authenticate, asyncHandler(async (req, res) => {
  const { name, description, sku, category, price, specs } = req.body;

  if (!name || !description || !sku || !category || !price) {
    throw new AppError('Missing required fields', 400);
  }

  // Get manufacturer profile
  const manufacturer = await Manufacturer.findOne({ where: { userId: req.user.id } });
  if (!manufacturer) {
    throw new AppError('You must create a manufacturer profile first', 400);
  }

  // Check if SKU already exists for this manufacturer
  const existingSku = await Product.findOne({
    where: { sku, manufacturerId: manufacturer.id }
  });
  if (existingSku) {
    throw new AppError('SKU already exists for your products', 409);
  }

  const product = await Product.create({
    manufacturerId: manufacturer.id,
    name,
    description,
    sku,
    category,
    price,
    specifications: specs || {}
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { product }
  });
}));

// ============================================
// UPDATE PRODUCT
// ============================================

router.put('/:id', authenticate, asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [Manufacturer]
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (product.Manufacturer.userId !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  const updatedProduct = await product.update(req.body);

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: { product: updatedProduct }
  });
}));

// ============================================
// DELETE PRODUCT
// ============================================

router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [Manufacturer]
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (product.Manufacturer.userId !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  await product.destroy();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
}));

// ============================================
// SEARCH PRODUCTS
// ============================================

router.get('/search/advanced', asyncHandler(async (req, res) => {
  const { query, category, minPrice, maxPrice, minRating, tags } = req.query;

  const where = { status: 'active' };

  if (query) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${query}%` } },
      { description: { [Op.iLike]: `%${query}%` } }
    ];
  }
  if (category) where.category = category;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = minPrice;
    if (maxPrice) where.price[Op.lte] = maxPrice;
  }
  if (minRating) where.rating = { [Op.gte]: minRating };

  const products = await Product.findAll({
    where,
    include: [{ model: Manufacturer, attributes: ['companyName', 'rating'] }],
    order: [['rating', 'DESC']],
    limit: 50
  });

  res.status(200).json({
    success: true,
    data: { products }
  });
}));

module.exports = router;
