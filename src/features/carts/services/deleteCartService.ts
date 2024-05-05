import prisma from '../../../libs/prisma'

export const deleteCartService = async (cartId: string) => {
  await prisma.carts.delete({
    where: {
      cartId: cartId
    }
  })
}
