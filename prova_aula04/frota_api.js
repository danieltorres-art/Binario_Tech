const express = require('express');
const app = express();
const PORT = 3006;

app.use(express.json());

let veiculos = [
  { id: 1, placa: 'ABC-1234', montadora: 'Volvo', modelo: 'FH 540', status: 'DISPONIVEL' },
  { id: 2, placa: 'XYZ-9876', montadora: 'Scania', modelo: 'R 450', status: 'EM_MANUTENCAO' }
];

let nextId = 3;

// ==========================================
// [DESAFIO 1] GET /api/v1/veiculos (Com suporte a Query Param ?status=...)
// ==========================================
app.get('/api/v1/veiculos', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtrados = veiculos.filter(v => v.status.toUpperCase() === status.toUpperCase());
    return res.status(200).json(filtrados);
  }
  return res.status(200).json(veiculos);
});

// ==========================================
// [DESAFIO 1 & 2] GET /api/v1/veiculos/:id (Com tratamento 404 Not Found)
// ==========================================
app.get('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const veiculo = veiculos.find(v => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado.' });
  }

  return res.status(200).json(veiculo);
});

// ==========================================
// [DESAFIO 1 & 2] POST /api/v1/veiculos (Validação 400 Bad Request e Criação 201 Created)
// ==========================================
app.post('/api/v1/veiculos', (req, res) => {
  const { placa, montadora, modelo } = req.body;

  if (!placa || !montadora || !modelo) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes: placa, montadora e modelo.' });
  }

  const novoVeiculo = {
    id: nextId++,
    placa,
    montadora,
    modelo,
    status: 'DISPONIVEL' // Status padrão exigido
  };

  veiculos.push(novoVeiculo);
  return res.status(201).json(novoVeiculo);
});

// ==========================================
// [DESAFIO 1 & 2] PATCH /api/v1/veiculos/:id/status (Atualização parcial com validação 400 e 404)
// ==========================================
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const veiculo = veiculos.find(v => v.id === id);
  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado.' });
  }

  if (!status) {
    return res.status(400).json({ erro: 'O campo status é obrigatório.' });
  }

  veiculo.status = status;
  return res.status(200).json(veiculo);
});

// ==========================================
// [DESAFIO 3] PUT /api/v1/veiculos/:id (Substituição completa, 400, 404 e 200 OK)
// ==========================================
app.put('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { placa, montadora, modelo, status } = req.body;

  const index = veiculos.findIndex(v => v.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Veículo não encontrado.' });
  }

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios para substituição (placa, montadora, modelo, status).' });
  }

  veiculos[index] = { id, placa, montadora, modelo, status };
  return res.status(200).json(veiculos[index]);
});

// ==========================================
// [DESAFIO 1 & 2] DELETE /api/v1/veiculos/:id (Remoção com tratamento 404)
// ==========================================
app.delete('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Veículo não encontrado.' });
  }

  const veiculoRemovido = veiculos.splice(index, 1);
  return res.status(200).json({ mensagem: 'Veículo removido com sucesso', veiculo: veiculoRemovido[0] });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
