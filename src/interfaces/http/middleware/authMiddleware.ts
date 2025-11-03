import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== "object") {
      console.log("Token no decodificable:", token);
      return res.status(401).json({ error: "Token inválido" });
    }

    const exp = (decoded as any).exp;
    const now = Math.floor(Date.now() / 1000);

    if (exp && exp < now) {
      return res.status(401).json({ error: "Token expirado" });
    }

    req.user = decoded;
    req.supabaseToken = token;
    next();
  } catch (err) {
    console.error("Error al decodificar token:", err);
    res.status(401).json({ error: "Token inválido" });
  }
};
