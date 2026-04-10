import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { authMiddleware } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

// Middleware para validação de token (já temos o authMiddleware)
// No entanto, para fins de demonstração, vamos usá-lo nas rotas

// Função auxiliar para validar token e email, se não estiver usando o middleware globalmente para todas as rotas
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

export const createProduct = async (req: Request, res: Response) => {
  const { nome, descricao, estoqueAtual, estoqueMinimo, categoriaId, imagemUrl, email, token } = req.body;

  if (!nome || !descricao || estoqueAtual === undefined || estoqueMinimo === undefined || !categoriaId || !email || !token) {
    return res.status(400).json({ message: "Dados incompletos para criar o produto." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const category = await prisma.categoria.findUnique({ where: { id: categoriaId } });
    if (!category || category.userId !== user.id) {
      return res.status(404).json({ message: "Categoria não encontrada ou sem permissão." });
    }

    const newProduct = await prisma.produto.create({
      data: {
        nome,
        descricao,
        estoqueAtual,
        estoqueMinimo,
        categoriaId,
        imagemUrl,
      },
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar produto." });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { nome, descricao, estoqueAtual, estoqueMinimo, categoriaId, imagemUrl, email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const product = await prisma.produto.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    const category = await prisma.categoria.findUnique({ where: { id: product.categoriaId } });
    if (!category || category.userId !== user.id) {
      return res.status(404).json({ message: "Produto não encontrado ou sem permissão." });
    }

    const updatedProduct = await prisma.produto.update({
      where: { id },
      data: {
        nome: nome ?? product.nome,
        descricao: descricao ?? product.descricao,
        estoqueAtual: estoqueAtual ?? product.estoqueAtual,
        estoqueMinimo: estoqueMinimo ?? product.estoqueMinimo,
        categoriaId: categoriaId ?? product.categoriaId,
        imagemUrl: imagemUrl ?? product.imagemUrl,
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
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

    const product = await prisma.produto.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    const category = await prisma.categoria.findUnique({ where: { id: product.categoriaId } });
    if (!category || category.userId !== user.id) {
      return res.status(404).json({ message: "Produto não encontrado ou sem permissão." });
    }

    await prisma.produto.delete({ where: { id } });

    return res.status(200).json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir produto." });
  }
};

export const listProducts = async (req: Request, res: Response) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email as string);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const products = await prisma.produto.findMany({
      where: { categoria: { userId: user.id } },
      include: { categoria: true },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar produtos." });
  }
};

export const getProductImageFromMeli = async (req: Request, res: Response) => {
  const { productName } = req.query;
  const { email, token } = req.body; // Adicionado para validação, mesmo sendo GET

  if (!productName) {
    return res.status(400).json({ message: "Nome do produto é obrigatório." });
  }

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const searchUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(productName as string)}`;
    const response = await axios.get(searchUrl);
    const items = response.data.results;

    if (items.length > 0) {
      // Retorna as URLs das imagens do primeiro item encontrado
      const imageUrls = items[0].thumbnail;
      return res.status(200).json({ imageUrl: imageUrls });
    } else {
      return res.status(404).json({ message: "Nenhuma imagem encontrada para o produto." });
    }
  } catch (error) {
    console.error("Erro ao buscar imagem no Mercado Livre:", error);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar imagem." });
  }
};

export const getShoppingList = async (req: Request, res: Response) => {
  const { email, token } = req.query;

  try {
    const user = await validateAuth(req.userId, req.userEmail, email as string);
    if (!user) return res.status(401).json({ message: "Autenticação falhou." });

    const products = await prisma.produto.findMany({
      where: {
        categoria: { userId: user.id }
      }
    });

    const belowMin = products.filter(p => p.estoqueAtual < p.estoqueMinimo);

    return res.status(200).json(belowMin);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao carregar lista de compras." });
  }
};

export const sellProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { quantidade, email, token } = req.body;

  try {
    const user = await validateAuth(req.userId, req.userEmail, email);
    if (!user) return res.status(401).json({ message: "Autenticação falhou." });

    const product = await prisma.produto.findUnique({
      where: { id },
      include: { combosFilho: true }
    });

    if (!product) return res.status(404).json({ message: "Produto não encontrado." });

    // Lógica de Combo: Se for um produto filho, desconta do pai
    // @ts-ignore
    const combos = product.combosFilho || [];
    for (const combo of combos) {
      const totalADescontar = combo.quantidadePai * quantidade;
      await prisma.produto.update({
        where: { id: combo.produtoPaiId },
        data: { estoqueAtual: { decrement: totalADescontar } }
      });
    }

    const updatedProduct = await prisma.produto.update({
      where: { id },
      data: { estoqueAtual: { decrement: quantidade } }
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao processar venda." });
  }
};