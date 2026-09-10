import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import conectarBanco from './src/config/database.js';
import manutencaoRoutes from './src/routes/manutencaoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/manutencoes', manutencaoRoutes);

console.log('Tentando conectar ao banco de dados...');

conectarBanco()
  .then(() => {
	      app.listen(PORT, () => {
		            console.log(`[Binário Tech] Servidor NoSQL Aula 12 ativo na porta ${PORT}`);
		          });
	    })
  .catch((err) => {
	      console.error('Erro crítico ao conectar no banco:', err.message);
	    });
