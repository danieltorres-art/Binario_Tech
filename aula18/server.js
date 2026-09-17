require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_aula18';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar no MongoDB:', error);
  });

const provaRoutes = require('./src/routes/prova');

app.use('/api/v1/prova', provaRoutes);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
