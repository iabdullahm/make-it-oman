const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { User } = require('../models');
const { AppError } = require('../middleware/errorHandler');

// ============================================
// REGISTER
// ============================================

router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, fullName, role } = req.body;

  // Validation
  if (!email || !password || !fullName) {
    throw new AppError('Email, password, and fullName are required', 400);
  }

  // Check if user exists
  const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  // Create user
  const user = await User.create({
    email: email.toLowerCase(),
    password,
    fullName,
    role: role || 'user'
  });

  // Generate token
  const token = user.generateToken();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: user.toJSON(),
      token
    }
  });
}));

// ============================================
// LOGIN
// ============================================

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  // Find user
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check status
  if (user.status === 'inactive' || user.status === 'suspended') {
    throw new AppError('Account is not active', 403);
  }

  // Update last login
  await user.update({ lastLogin: new Date() });

  // Generate token
  const token = user.generateToken();

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.toJSON(),
      token
    }
  });
}));

// ============================================
// GET CURRENT USER
// ============================================

router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: { user: user.toJSON() }
  });
}));

// ============================================
// LOGOUT
// ============================================

router.post('/logout', authenticate, asyncHandler(async (req, res) => {
  // In a real application, you might want to blacklist the token
  // or maintain a session store

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
}));

// ============================================
// RESET PASSWORD
// ============================================

router.post('/reset-password', asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    throw new AppError('Email and new password are required', 400);
  }

  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // In production, you should send a reset token via email
  // and verify it before allowing password change

  await user.update({ password: newPassword });

  res.status(200).json({
    success: true,
    message: 'Password reset successful'
  });
}));

module.exports = router;
