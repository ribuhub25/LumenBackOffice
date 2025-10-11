import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.decode(token); // solo decodifica, no verifica firma
    const exp = decoded?.payload?.exp;
    const now = Math.floor(Date.now() / 1000);
    if (exp && exp < now) {
      return res.status(401).json({ error: "Token expirado" });
    }
    req.user = decoded.payload;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
