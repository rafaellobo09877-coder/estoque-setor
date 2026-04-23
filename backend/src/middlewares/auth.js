import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ⚠️ MESMO SEGREDO DO LOGIN
    const decoded = jwt.verify(token, "SEGREDO");

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}