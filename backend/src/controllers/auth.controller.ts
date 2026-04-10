import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Por favor, preencha todos os campos (username, email, password).",
    });
  }

  try {
    const usuarioExiste = await prisma.user.findUnique({
      where: { email: email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ message: "Este e-mail já está em uso!" });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    const novoUsuario = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: senhaCriptografada,
      },
    });

    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    const expiradoEm = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    await prisma.token.create({
      data: {
        userId: novoUsuario.id,
        token: token,
        criadoEm: new Date(),
        expiradoEm: expiradoEm,
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
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Por favor, preencha todos os campos (email, password)." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({ message: "E-mail ou senha inválidos." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    const expiradoEm = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    await prisma.token.create({
      data: {
        userId: user.id,
        token: token,
        criadoEm: new Date(),
        expiradoEm: expiradoEm,
      },
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
      token: token,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
