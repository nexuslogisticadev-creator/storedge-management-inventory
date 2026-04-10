import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// authMiddleware valida o Bearer Token antes de chegar aqui.
// req.userId é populado pelo middleware e usado como fonte de verdade.

export const createCategory = async (req: Request, res: Response) => {
  const { nome, descricao, cor } = req.body;

  if (!nome || !descricao || !cor) {
    return res.status(400).json({ message: "Dados incompletos. Envie: nome, descricao, cor." });
  }

  // Validação opcional do formato hexadecimal
  if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(cor)) {
    return res.status(400).json({ message: "Cor inválida. Use o formato hexadecimal: #RRGGBB ou #RGB." });
  }

  try {
    const category = await prisma.categoria.create({
      data: {
        nome,
        descricao,
        cor,
        userId: req.userId as string,
      }
    });

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar categoria." });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { novoNome, novaDescricao, novaCor } = req.body;

  if (novaCor && !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(novaCor as string)) {
    return res.status(400).json({ message: "Cor inválida. Use o formato hexadecimal: #RRGGBB ou #RGB." });
  }

  try {
    const category = await prisma.categoria.findUnique({ where: { id } });

    if (!category || category.userId !== req.userId) {
      return res.status(404).json({ message: "Categoria não encontrada ou sem permissão." });
    }

    const updatedCategory = await prisma.categoria.update({
      where: { id },
      data: {
        nome: (novoNome as string) ?? category.nome,
        descricao: (novaDescricao as string) ?? category.descricao,
        cor: (novaCor as string) ?? category.cor,
      }
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar categoria." });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "Informe o nome da categoria para confirmar a exclusão." });
  }

  try {
    const category = await prisma.categoria.findUnique({ where: { id } });

    if (!category || category.userId !== req.userId || category.nome !== (nome as string)) {
      return res.status(404).json({ message: "Categoria não encontrada, nome incorreto ou sem permissão." });
    }

    // Futuramente: também excluirá todos os produtos vinculados (cascade).
    await prisma.categoria.delete({ where: { id } });

    return res.status(200).json({ message: "Categoria excluída com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir categoria." });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categoria.findMany({
      where: { userId: req.userId as string }
    });

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar categorias." });
  }
};
