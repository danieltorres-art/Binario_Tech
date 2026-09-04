const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/v1/scania', (req, res) => {
	    res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82 });
});

app.get('/api/v1/mercedes', (req, res) => {
	    res.json({ montadora: "Mercedes-Benz", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78 });
});

app.get('/api/v1/vw', (req, res) => {
	    res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.get('/api/v1/volvo', (req, res) => {
	    res.json({ montadora: "Volvo", modelo: "FH 540", status: "OK" });
});

app.get('/status', (req, res) => {
	  res.json({ status: 'OK', uptime: process.uptime() });
});

app.get('/scania/info', (req, res) => {
	  res.json({
		      montadora: 'Scania',
		      sistema_telemetria: 'Communicator 3'
		    });
});

app.get('/vw/info', (req, res) => {
	  res.json({
		      montadora: 'Volkswagen',
		      status: 'operacional',
		      sistema_telemetria: 'VW Connect'
		    });
});

app.listen(PORT, () => {
	    console.log(`[Binario Tech] Servidor de Telemetria rodando em http://localhost:${PORT}`);
});
