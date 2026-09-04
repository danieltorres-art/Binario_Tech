const express = require('express');
const cors = require('cors');
const scaniaRoutes = require('./src/routes/scaniaRoutes');
const mercedesRoutes = require('./src/routes/mercedesRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
	    next();
});

app.use('/api/v1/telemetria/scania', scaniaRoutes);
app.use('/api/v1/telemetria/mercedes', mercedesRoutes);

app.use((req, res) => {
	    res.status(404).json({ erro: "Modulo ou rota de telemetria não encontrada." });
});

app.listen(PORT, () => {
	    console.log(`[Binário Tech] Servidor Modularizado Ativo na Porta ${PORT}`);
});
