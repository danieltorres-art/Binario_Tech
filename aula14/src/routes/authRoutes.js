const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

// Rotas públicas
router.post('/register', authController.registrar);
router.post('/login', authController.login);

// Rota privada com dupla proteção: Autenticação + Autorização por Perfil (Apenas ADMIN)
router.get('/perfil', autenticarToken, autorizarPerfil(['ADMIN']), authController.perfil);

module.exports = router;
