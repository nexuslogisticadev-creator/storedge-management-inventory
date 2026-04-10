import { Router } from 'express';
import { createCombo, updateCombo, deleteCombo, listCombos } from '../controllers/combo.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const comboRoutes = Router();

comboRoutes.use(authMiddleware); // Aplica o middleware de autenticação a todas as rotas de combo

comboRoutes.get('/', listCombos);
comboRoutes.post('/', createCombo);
comboRoutes.put('/:id', updateCombo);
comboRoutes.delete('/:id', deleteCombo);

export default comboRoutes;