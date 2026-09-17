const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validarJWT = require('../middlewares/validarJWT');

// Questão 1 e 2 (Públicas)
router.post('/register', authController.register);
router.post('/login', authController.login);

// QUESTÃO 3 (Protegida com validarJWT)
router.get('/relatorio', validarJWT, authController.relatorio);

module.exports = router;
