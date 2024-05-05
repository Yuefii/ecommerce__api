import prisma from '../../../libs/prisma'

export const deleteOrderService = async (orderId: string) => {
  await prisma.orders.delete({
    where: {
      orderId: orderId
    }
  })
}
