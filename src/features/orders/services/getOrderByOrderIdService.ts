import prisma from '../../../libs/prisma'

export const getOrderByOrderIdService = async (orderId: string) => {
  const result = await prisma.orders.findUnique({
    where: {
      orderId: orderId
    },
    include: {
      user: true,
      items: true
    }
  })
  return result
}
