const express = require('express');
const app = express();
const PORT = 3006;

app.use(express.json());

// Banco de dados em memoria inicial
let veiculos = [
  { id: 1, placa: 'ABC-1234', montadora: 'Scania', modelo: 'R450', status: 'DISPONIVEL' },
  { id: 2, placa: 'XYZ-5678', montadora: 'Volvo', modelo: 'VM 270', status: 'EM_ROTA' }
];

let proximoId = 3;

// Exercicio 04 e Listagem Geral: GET /api/v1/veiculos (suporta query param ?status=)
app.get('/api/v1/veiculos', (req, res) => {
  const { status } = req.query;

  if (status) {
    const filtrados = veiculos.filter(
      (v) => v.status.toUpperCase() === status.toUpperCase()
    );
    return res.status(200).json(filtrados);
  }

  return res.status(200).json(veiculos);
});

// Exercicio 01: GET /api/v1/veiculos/:id (buscar veiculo por ID)
app.get('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const veiculo = veiculos.find((v) => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ erro: 'Veiculo nao encontrado.' });
  }

  return res.status(200).json(veiculo);
});

// Exercicio 02 e Exercicio 03: POST /api/v1/veiculos (cadastrar veiculo com validacao)
app.post('/api/v1/veiculos', (req, res) => {
  const { placa, montadora, modelo, status } = req.body;

  // Validação: verifica se os campos obrigatorios foram enviados
  if (!placa || !montadora || !modelo) {
    return res.status(400).json({
      erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."
    });
  }

  const novoVeiculo = {
    id: proximoId++,
    placa,
    montadora,
    modelo,
    status: status || 'DISPONIVEL'
  };

  veiculos.push(novoVeiculo);
  return res.status(201).json(novoVeiculo);
});

// Exercicio 05 e Exercicio 06: PATCH /api/v1/veiculos/:id (atualizacao parcial)
app.patch('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const veiculo = veiculos.find((v) => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ erro: 'Veiculo nao encontrado.' });
  }

  Object.assign(veiculo, req.body);
  return res.status(200).json(veiculo);
});

// Exercicio 07: PUT /api/v1/veiculos/:id (substituicao completa dos dados)
app.put('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Veiculo nao encontrado.' });
  }

  const { placa, montadora, modelo, status } = req.body;

  if (!placa || !montadora || !modelo) {
    return res.status(400).json({
      erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios para substituicao completa."
    });
  }

  veiculos[index] = {
    id,
    placa,
    montadora,
    modelo,
    status: status || 'DISPONIVEL'
  };

  return res.status(200).json(veiculos[index]);
});

// DELETE /api/v1/veiculos/:id (remover veiculo)
app.delete('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Veiculo nao encontrado.' });
  }

  veiculos.splice(index, 1);
  return res.status(200).json({ mensagem: 'Veiculo removido com sucesso.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
