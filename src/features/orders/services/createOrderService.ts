import prisma from '../../../libs/prisma'

export const createOrderService = async (productData: {
  userId: string
  status: string
  items: []
}) => {
  const { userId, status, items } = productData
  const result = await prisma.orders.create({
    data: {
      userId,
      status,
      items: {
        createMany: {
          data: items.map(
            (item: { productId: string; quantity: number; price: number }) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.quantity * item.price
            })
          )
        }
      }
    },
    include: {
      user: true,
      items: true
    }
  })
  return result
}
