
nst express = require('express');
const db = require('../database/connection');

const veiculosController = {
	  listarTodos: async (req, res) => {
		      try {
			            const veiculos = await db('veiculos').select('*');
			            return res.status(200).json(veiculos);
			          } catch (erro) {
					        return res.status(500).json({ erro: "Erro ao consultar banco de dados." });
					      }
		    },

	  criar: async (req, res) => {
		      try {
			            const { placa, montadora, modelo } = req.body;

			            if (!placa || !montadora || !modelo) {
					            return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' são obrigatórios." });
					          }

			            const [id] = await db('veiculos').insert({
					            placa,
					            montadora,
					            modelo
					          });

			            const novoVeiculo = await db('veiculos').where('id', id).first();
			            return res.status(201).json(novoVeiculo);
			          } catch (erro) {
					        if (erro.message.includes('UNIQUE constraint failed')) {
							        return res.status(409).json({ erro: "Já existe um veículo cadastrado com esta placa." });
							      }
					        return res.status(500).json({ erro: "Erro ao inserir veículo no banco de dados." });
					      }
		    },

	  buscarPorId: async (req, res) => {
		      try {
			            const { id } = req.params;
			            const veiculo = await db('veiculos').where({ id }).first();

			            if (!veiculo) {
					            return res.status(404).json({ erro: 'Veículo não localizado.' });
					          }

			            return res.status(200).json(veiculo);
			          } catch (erro) {
					        return res.status(500).json({ erro: 'Erro ao buscar veículo no banco de dados.' });
					      }
		    },

	  atualizarStatus: async (req, res) => {
		      try {
			            const { id } = req.params;
			            const { status } = req.body;

			            const veiculo = await db('veiculos').where({ id }).first();
			            if (!veiculo) {
					            return res.status(404).json({ erro: 'Veículo não localizado.' });
					          }

			            await db('veiculos').where({ id }).update({ status });
			            return res.status(200).json({ mensagem: 'Status do veículo atualizado com sucesso.' });
			          } catch (erro) {
					        console.log(erro);
					        return res.status(500).json({ erro: 'Erro ao atualizar status do veículo.' });
					      }
		    }
};

module.exports = veiculosController;
