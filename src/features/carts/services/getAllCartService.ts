import prisma from '../../../libs/prisma'

export const getAllCartService = async () => {
  const result = await prisma.carts.findMany({
    include: {
      product: true,
      user: true
    }
  })
  return result
}
