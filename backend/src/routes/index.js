import { Router } from "express";
import authRoutes from "./auth.js";
import { authMiddleware } from "../middlewares/auth.js";

// (se você tiver rotas separadas, pode importar aqui)
// import productsRoutes from "./products.js";
// import movementsRoutes from "./movements.js";
// import dashboardRoutes from "./dashboard.js";

const router = Router();

// ==================
// ROTAS LIVRES (SEM TOKEN)
// ==================
router.use("/auth", authRoutes);

// ==================
// ROTAS PROTEGIDAS (COM TOKEN)
// ==================

// 🔥 TESTE PROTEGIDO
router.get("/teste", authMiddleware, (req, res) => {
  res.json({ msg: "Acesso liberado 🔓", user: req.user });
});

// 🔥 PRODUCTS
router.get("/products", authMiddleware, (req, res) => {
  res.json({ msg: "Produtos funcionando 🚀" });
});

// 🔥 MOVEMENTS
router.get("/movements", authMiddleware, (req, res) => {
  res.json({ msg: "Movimentos funcionando 🚀" });
});

// 🔥 DASHBOARD
router.get("/dashboard", authMiddleware, (req, res) => {
  const { month, year } = req.query;

  res.json({
    msg: "Dashboard funcionando 🚀",
    month,
    year
  });
});

// 🔥 STOCK
router.get("/stock/current", authMiddleware, (req, res) => {
  const { month, year } = req.query;

  res.json({
    msg: "Estoque funcionando 🚀",
    month,
    year
  });
});

export default router;