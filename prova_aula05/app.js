const express = require('express');
const cors = require('cors');

// Importação dos Middlewares
const logger = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const validaCnh = require('./middlewares/validaCnh');

// Importação das Rotas
const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(logger);

// Desafio 1: Rota pública de Health Check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Protegendo as rotas com o middleware de autenticação
app.use('/api/v1/motoristas', authMiddleware);
app.use('/api/v1/manutencoes', authMiddleware);

// Desafio 4: Aplicando validação de CNH exclusivamente na rota POST de motoristas
app.post('/api/v1/motoristas', validaCnh);

// Registro dos Roteadores
app.use('/api/v1/motoristas', motoristasRouter);
app.use('/api/v1/manutencoes', manutencoesRouter);

// Desafio 4: Tratamento Global de Erros para rotas inexistentes (404)
app.use((req, res, next) => {
    res.status(404).json({
        "erro": "Endpoint nao encontrado no servidor Binario Tech."
    });
});

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
