import mongoose from 'mongoose';

const conectarBanco = async () => {
	  try {
		      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aula12');
		      console.log('[MongoDB] Conectado com sucesso!');
		    } catch (error) {
			        console.error('[MongoDB] Erro de conexão:', error.message);
			        process.exit(1);
			      }
};

export default conectarBanco;
