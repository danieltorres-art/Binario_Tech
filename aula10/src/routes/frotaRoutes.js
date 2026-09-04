const express = require('express');
const router = express.Router();
const frotaController = require('../controllers/frotaController');

router.get('/', frotaController.listarTudo);
router.post('/', frotaController.cadastrarVeiculo);

module.exports = router;
