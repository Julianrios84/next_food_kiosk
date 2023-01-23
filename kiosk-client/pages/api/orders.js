import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const orders = await prisma.order.findMany({
    where: {
      status: false
    }
  })

  res.status(200).json(orders);

  if (req.method === 'POST') {
    const { name, total, order, date } = req.body;
    const createdOrder = await prisma.order.create({
      data: {
        name,
        total,
        products: order,
        date
      }
    });
    res.status(200).json(createdOrder);
  }
}
