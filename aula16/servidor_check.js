const express = require('express');
const app = express();
const PORT =3006;

app.use(express.json());

app.get('/api/v1/status-servidor', (req, res) => {
	res.json({
		status: "ONLINE",
		ambiente: "Servidor Local de Prova - Binario Tech",
		usuario: process.env.USER || "aluno",
		dataCheck: new Date()
	});
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] SERVIDOR DE VALIDAÇÃO DA AULA 16 ATIVO NA PORTA ${PORT}`);
});
// Teste de alteracao no Cloud Shell
