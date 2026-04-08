import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
// 2.  o mensageiro
const prisma = new PrismaClient();

// NOTA IMPORTANTE: Colocamos a palavra 'async' antes dos parâmetros.
// Como salvar no banco demora alguns milissegundos, o código precisa ser 'assíncrono' (esperar o banco responder).
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message:
        "Por favor, preencha todos os campos (username, email, password).",
    });
  }

  try {
    // 3. O 'await' faz o código esperar. Vamos no banco ver se o e-mail já existe.
    const usuarioExiste = await prisma.user.findUnique({
      where: { email: email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ message: "Este e-mail já está em uso!" });
    }

    //CRIPTOGRAFIA ---
    // 2. Geramos um "salt" (uma string aleatória que deixa a senha ainda mais forte, o nível 10 é o padrão seguro)
    const salt = await bcrypt.genSalt(10);
    // 3. Misturamos a senha original com o salt para gerar o hash (a senha embaralhada)
    const senhaCriptografada = await bcrypt.hash(password, salt);
    // --------------------------------

    // 4. Salvamos no banco usando a senhaCriptografada no lugar da senha original
    const novoUsuario = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: senhaCriptografada, // <- Agora o banco vai receber o código embaralhado!
      },
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso e senha protegida!",
      user: {
        id: novoUsuario.id,
        username: novoUsuario.username,
        email: novoUsuario.email,
        created_at: novoUsuario.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
//login
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios para o login." });
  }

  return res.status(200).json({
    message: "Login realizado com sucesso!",
    token: "aqui-vai-entrar-um-token-jwt-no-futuro",
  });
};
