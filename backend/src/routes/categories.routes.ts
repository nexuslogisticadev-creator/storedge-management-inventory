import { Router } from 'express';
import { createCategory, updateCategory, deleteCategory, listCategories } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const categoryRoutes = Router();

categoryRoutes.use(authMiddleware); // Autenticação JWT em todas as rotas de categoria

categoryRoutes.get('/', listCategories);
categoryRoutes.post('/', createCategory);
categoryRoutes.put('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

export default categoryRoutes;