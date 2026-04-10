import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Token de autenticação não fornecido ou mal formatado." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    const storedToken = await prisma.token.findUnique({
      where: {
        token: token,
        userId: decoded.id,
      },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiradoEm < new Date()) {
      return res.status(401).json({ message: "Token inválido ou expirado." });
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token inválido." });
    }
    console.error("Erro no middleware de autenticação:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};