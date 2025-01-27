const express = require('express');
const router = express.Router();
const { registerCompany, loginCompany } = require('../controllers/authController');

// Register route
router.post('/register', registerCompany);

// Login route
router.post('/login', loginCompany);

module.exports = router;
