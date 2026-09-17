const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validarJWT = require('../middlewares/validarJWT');

// Questões 1 e 2
router.post('/register', authController.register);
router.post('/login', authController.login);

// QUESTÃO 3: Rota protegida com JWT
router.get('/relatorio', validarJWT, (req, res) => {
  res.status(200).json({
    mensagem: 'Relatório gerado com sucesso!',
    usuario: req.user
  });
});

module.exports = router;
