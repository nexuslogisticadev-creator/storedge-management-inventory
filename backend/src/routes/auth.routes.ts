import { Router } from 'express';
// 1. Importamos as funções que você acabou de criar no controller
import { register, login } from '../controllers/auth.controller';

const authRoutes = Router();

// 2. Agora dizemos para a rota usar a função do controller em vez daquele (req, res) direto aqui
authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes;