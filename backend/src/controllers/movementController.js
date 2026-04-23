import { prisma } from '../lib.js';

export async function createMovement(req, res) {
  try {
    const { productId, type, quantity, note } = req.body;

    // validação
    if (!productId || !type || !quantity) {
      return res.status(400).json({
        error: 'Preencha os campos obrigatórios'
      });
    }

    const now = new Date();

    const movement = await prisma.movement.create({
      data: {
        productId: Number(productId),
        type,
        quantity: Number(quantity),
        note: note || null,
        movementDate: now,
        referenceMonth: now.getMonth() + 1,
        referenceYear: now.getFullYear()
      }
    });

    return res.json(movement);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Erro ao criar movimentação'
    });
  }
}

export async function listMovements(req, res) {
  try {
    const movements = await prisma.movement.findMany({
      include: { product: true },
      orderBy: { movementDate: 'desc' }
    });

    return res.json(movements);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}