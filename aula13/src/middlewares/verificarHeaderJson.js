const verificarHeaderJson = (req, res, next) => {
	if (req.method === 'POST') {
		const contentType = req.headers['content-type'];
		if (!contentType || !contentType.includes('application/json')) {
			return res.status(400).json({
		        	status: "CABECALHO_INVALIDO",
				mensagem: "Requisições POST devem conter o cabeçalho Content-Type: application/json."
			});
		}
	}
	next();
};

module.exports = verificarHeaderJson;
