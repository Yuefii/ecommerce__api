import prisma from '../../../libs/prisma'

export const getAllOrderService = async () => {
  const result = await prisma.orders.findMany({
    include: {
      items: true,
      user: true
    }
  })
  return result
}
