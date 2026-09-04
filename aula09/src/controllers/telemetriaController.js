const db = require('../database/connection');

const telemetriaController = {
	  registrarLeitura: async (req, res) => {
		      try {
			            const { veiculo_id, velocidade, temperatura_motor } = req.body;

			            if (!veiculo_id || velocidade === undefined || temperatura_motor === undefined) {
					            return res.status(400).json({ erro: "Campos 'veiculo_id', 'velocidade' e 'temperatura_motor' são obrigatórios." });
					          }

			            const veiculoExiste = await db('veiculos').where({ id: veiculo_id }).first();

			            if (!veiculoExiste) {
					            return res.status(404).json({ erro: "Veículo informado não existe no banco de dados." });
					          }

			            const [id] = await db('telemetria').insert({
					            veiculo_id,
					            velocidade,
					            temperatura_motor
					          });

			            return res.status(201).json({ id, veiculo_id, velocidade, temperatura_motor, mensagem: "Leitura registrada com sucesso!" });
			          } catch (erro) {
					        return res.status(500).json({ erro: "Erro ao registrar telemetria no banco de dados." });
					      }
		    },

	  buscarPorVeiculo: async (req, res) => {
		      try {
			            const { id } = req.params;
			            const { min_velocidade, min_temperatura } = req.query;

			            const veiculoExiste = await db('veiculos').where({ id }).first();
			            if (!veiculoExiste) {
					            return res.status(404).json({ erro: 'Veículo não localizado.' });
					          }

			            let query = db('telemetria').where({ veiculo_id: id });

			            if (min_velocidade) {
					            query = query.where('velocidade', '>=', Number(min_velocidade));
					          }

			            if (min_temperatura) {
					            query = query.where('temperatura_motor', '>=', Number(min_temperatura));
					          }

			            const leituras = await query;
			            return res.status(200).json(leituras);
			          } catch (erro) {
					        return res.status(500).json({ erro: 'Erro ao buscar leituras de telemetria do veículo.' });
					      }
		    },

	  listarRelatorioCompleto: async (req, res) => {
		      try {
			            const relatorio = await db('telemetria')
			              .join('veiculos', 'veiculos.id', '=', 'telemetria.veiculo_id')
			              .select(
					                'telemetria.id as telemetria_id',
					                'telemetria.velocidade',
					                'telemetria.temperatura_motor',
					                'veiculos.id as veiculo_id',
					                'veiculos.placa',
					                'veiculos.modelo'
					              );

			            return res.status(200).json(relatorio);
			          } catch (erro) {
					        return res.status(500).json({ erro: "Erro ao consultar relatórios no banco de dados." });
					      }
		    }
};

module.exports = telemetriaController;
