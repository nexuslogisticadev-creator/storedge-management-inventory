import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validateAuth = async (userId: string | undefined, userEmail: string | undefined, emailFromBody: string) => {
  if (!userId || !userEmail || userEmail !== emailFromBody) {
    return null; // Autenticação falhou
  }

  const user = await prisma.user.findUnique({
    where: { id: userId, email: userEmail },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const createCombo = async (req: Request, res: Response) => {
  const { nome, quantidadePai, produtoPaiId, produtoFilhoId, email, token } = req.body;

  if (!nome || quantidadePai === undefined || !produtoPaiId || !produtoFilhoId || !email || !token) {
    return res.status(400).json({ message: "Dados incompletos para criar o combo." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const produtoPai = await prisma.produto.findUnique({ where: { id: produtoPaiId } });
    const produtoFilho = await prisma.produto.findUnique({ where: { id: produtoFilhoId } });

    if (!produtoPai || !produtoFilho) {
      return res.status(404).json({ message: "Produto pai ou filho não encontrado." });
    }

    // Verifica se os produtos pai e filho pertencem ao mesmo usuário (através da categoria)
    const categoriaPai = await prisma.categoria.findUnique({ where: { id: produtoPai.categoriaId } });
    const categoriaFilho = await prisma.categoria.findUnique({ where: { id: produtoFilho.categoriaId } });

    if (!categoriaPai || categoriaPai.userId !== user.id || !categoriaFilho || categoriaFilho.userId !== user.id) {
      return res.status(403).json({ message: "Produtos do combo não pertencem ao usuário autenticado." });
    }

    const newCombo = await prisma.combo.create({
      data: {
        nome,
        quantidadePai,
        produtoPaiId,
        produtoFilhoId,
      },
    });

    return res.status(201).json(newCombo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar combo." });
  }
};

export const updateCombo = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { nome, quantidadePai, produtoPaiId, produtoFilhoId, email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const combo = await prisma.combo.findUnique({ where: { id } });
    if (!combo) {
      return res.status(404).json({ message: "Combo não encontrado." });
    }

    const produtoPai = await prisma.produto.findUnique({ where: { id: combo.produtoPaiId } });
    const produtoFilho = await prisma.produto.findUnique({ where: { id: combo.produtoFilhoId } });

    if (!produtoPai || !produtoFilho) {
      return res.status(404).json({ message: "Produto pai ou filho do combo não encontrado." });
    }

    const categoriaPai = await prisma.categoria.findUnique({ where: { id: produtoPai.categoriaId } });
    if (!categoriaPai || categoriaPai.userId !== user.id) {
      return res.status(403).json({ message: "Combo não encontrado ou sem permissão." });
    }

    const updatedCombo = await prisma.combo.update({
      where: { id },
      data: {
        nome: nome ?? combo.nome,
        quantidadePai: quantidadePai ?? combo.quantidadePai,
        produtoPaiId: produtoPaiId ?? combo.produtoPaiId,
        produtoFilhoId: produtoFilhoId ?? combo.produtoFilhoId,
      },
    });

    return res.status(200).json(updatedCombo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar combo." });
  }
};

export const deleteCombo = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const combo = await prisma.combo.findUnique({ where: { id } });
    if (!combo) {
      return res.status(404).json({ message: "Combo não encontrado." });
    }

    const produtoPai = await prisma.produto.findUnique({ where: { id: combo.produtoPaiId } });
    if (!produtoPai) {
      return res.status(404).json({ message: "Produto pai do combo não encontrado." });
    }

    const categoriaPai = await prisma.categoria.findUnique({ where: { id: produtoPai.categoriaId } });
    if (!categoriaPai || categoriaPai.userId !== user.id) {
      return res.status(403).json({ message: "Combo não encontrado ou sem permissão." });
    }

    await prisma.combo.delete({ where: { id } });

    return res.status(200).json({ message: "Combo excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir combo." });
  }
};

export const listCombos = async (req: Request, res: Response) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email as string);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const combos = await prisma.combo.findMany({
      where: {
        produtoPai: {
          categoria: {
            userId: user.id
          }
        }
      },
      include: { produtoPai: true, produtoFilho: true },
    });

    return res.status(200).json(combos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar combos." });
  }
};