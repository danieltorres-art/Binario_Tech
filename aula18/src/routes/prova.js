const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // ou o caminho do seu middleware

// Questão 1
router.post('/register', authController.register);

// Questão 2
router.post('/login', authController.login);

// Questão 3 - Rota Protegida
router.get('/relatorio', authMiddleware, (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado ao relatório!',
    usuarioId: req.userId
  });
});

module.exports = router;
