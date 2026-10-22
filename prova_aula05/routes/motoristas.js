const express = require('express');
const router = express.Router();

let motoristas = [];
let nextId = 1;

// GET /api/v1/motoristas
router.get('/', (req, res) => {
    res.status(200).json(motoristas);
});

// POST /api/v1/motoristas
router.post('/', (req, res) => {
    const { nome, cnh, categoria } = req.body;

    if (!nome || !cnh || !categoria) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes: 'nome', 'cnh' e 'categoria' são obrigatórios." });
    }

    const novoMotorista = { 
        id: nextId++, 
        nome, 
        cnh, 
        categoria, 
        ativo: true 
    };
    
    motoristas.push(novoMotorista);
    res.status(201).json(novoMotorista);
});

module.exports = router;
