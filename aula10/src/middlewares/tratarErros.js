function tratarErros(err, req, res, next) {
	    console.error(`[ERRO LOG]: ${err.message}`);

	    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		            return res.status(400).json({ erro: "Formato do corpo da requisição (JSON) é inválido." });
		        }

	    const mensagem = err.message ? err.message.toUpperCase() : '';

	    if (mensagem.includes('UNIQUE CONSTRAINT FAILED') || err.code === 'SQLITE_CONSTRAINT_UNIQUE' || err.code === 'SQLITE_CONSTRAINT') {
		            return res.status(409).json({ erro: "Conflito de dados: Registro já existe com este valor único (ex: Placa)." });
		        }

	    if (mensagem.includes('FOREIGN KEY CONSTRAINT FAILED') || err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
		            return res.status(400).json({ erro: "Erro de relacionamento: O registro pai fornecido não existe." });
		        }

	    return res.status(500).json({ erro: "Erro interno no servidor da Binário Tech." });
}

module.exports = tratarErros;
