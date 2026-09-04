const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

//Função Auxiliar: Ler Arquivo JSON
async function lerOcorrencias() {
	try {
		const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
		return JSON.parse(dados);
	} catch (erro) {
		// Se o arquivo não existir, retorna array vazio e cria o arquivo
		await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
		return [];
	}
}

//Função Auxiliar: Salvar no arquivo JSON
async function salvarOcorrencias(ocorrencias) {
	await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

//ROTA 1: listar todas as ocorrências
app.get('/api/v1/ocorrencias', async (req, res) => {
	try {
		const ocorrencias = await lerOcorrencias();
		res.status(200).json(ocorrencias);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
	}
});

// GET - Filtrar ocorrências por montadora
app.get('/api/v1/ocorrencias/montadora/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const ocorrencias = await lerOcorrencias();

        const filtradas = ocorrencias.filter(
            o => o.montadora && o.montadora.toLowerCase() === nome.toLowerCase()
        );

        return res.status(200).json(filtradas);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
    }
});

app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ocorrencias = await lerOcorrencias();

        // Procura comparando id ou _id convertidos para string
        const index = ocorrencias.findIndex(o => 
            String(o.id) === String(id) || String(o._id) === String(id)
        );

        if (index === -1) {
            return res.status(404).json({ erro: "Ocorrência não encontrada." });
        }

        // Remove o item
        ocorrencias.splice(index, 1);

        // Salva de volta no JSON
        await escreverOcorrencias(ocorrencias);

        return res.status(200).json({ mensagem: "Ocorrência removida com sucesso!" });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao remover ocorrência do banco de dados." });
    }
});

// ROTA 2: Cadastrar nova ocorrência na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
	try {
		const { montadora, placa, descricao, gravidade } = req.body;

		if (!montadora || !placa || !descricao) {
			return res.status(400).json({ erro: "Montadora, placa e descricao são obrigatórios."
});
		}
		
		const ocorrencias = await lerOcorrencias();
		const novaOcorrencia = {
			id: Date.now(),
			montadora,
			placa,
			descricao,
			gravidade: gravidade || "MEDIA",
			data_registro: new Date().toISOString()
		};

		ocorrencias.push(novaOcorrencia);
		await salvarOcorrencias(ocorrencias);

		res.status(201).json(novaOcorrencia);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao salvar ocorrência em disco." });
	}
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] API de Ocorrências ativa na porta ${PORT}`);
});

