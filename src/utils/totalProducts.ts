import prisma from '../libs/prisma'

export const getTotalProducts = async () => {
  const totalProducts = await prisma.products.count()
  return totalProducts
}
