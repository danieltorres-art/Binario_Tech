const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Questão 1
router.post('/register', authController.register);

// Questão 2
router.post('/login', authController.login);

module.exports = router;
