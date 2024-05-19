import prisma from '../../../libs/prisma'

export const updateOrderService = async (
  orderId: string,
  productData: {
    status: string
  }
) => {
  const { status } = productData

  const result = await prisma.orders.update({
    where: {
      orderId: orderId
    },
    data: {
      status: status
    },
    include: {
      items: true,
      user: true
    }
  })
  return result
}
