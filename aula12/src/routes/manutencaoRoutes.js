import express from 'express';
import manutencaoController from '../controllers/manutencaoController.js';

const router = express.Router();

router.post('/', manutencaoController.criar);
router.get('/', manutencaoController.listarComFiltros);
router.get('/placa/:placa', manutencaoController.buscarPorPlaca);
router.post('/:id/pecas', manutencaoController.adicionarPeca);
router.patch('/:id/status', manutencaoController.atualizarStatus);
router.delete('/:id', manutencaoController.excluir);

export default router;
