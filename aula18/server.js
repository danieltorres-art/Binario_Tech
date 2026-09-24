require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_prova')
  .then(() => console.log('MongoDB conectado!'))
  .catch((error) => console.error('Erro ao conectar no MongoDB:', error));

// Rotas da prova
const provaRoutes = require('./src/routes/prova');
app.use('/api/v1/prova', provaRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
