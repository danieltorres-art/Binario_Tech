const express = require('express');
const router = express.Router();

let manutencoes = [];
let nextId = 1;

// GET /api/v1/manutencoes
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
router.post('/', (req, res) => {
    const { placa, descricao, valor } = req.body;

    if (!placa || !descricao || !valor) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes: 'placa', 'descricao' e 'valor' são obrigatórios." });
    }

    const novaManutencao = { 
        id: nextId++, 
        placa, 
        descricao, 
        valor 
    };
    
    manutencoes.push(novaManutencao);
    res.status(201).json(novaManutencao);
});

module.exports = router;
