import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib.js";

const router = Router();

// ==================
// REGISTER
// ==================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hash
      }
    });

    res.json({ msg: "Usuário criado", user });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// ==================
// LOGIN
// ==================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      return res.status(401).json({ erro: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user.id },
      "SEGREDO",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;