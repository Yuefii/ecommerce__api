import prisma from '../../../libs/prisma'

export const getCartByCartIdService = async (cartId: string) => {
  const result = await prisma.carts.findUnique({
    where: {
      cartId: cartId
    },
    include: {
      product: true,
      user: true
    }
  })
  return result
}
