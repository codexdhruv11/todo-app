const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

module.exports = router;
// Update on 2025-02-14T10:13:38