import prisma from '../../../libs/prisma'

export const getDiscusByProductIdService = async (productId: string) => {
  const result = await prisma.discus.findMany({
    where: {
      productId: productId
    },
    include: {
      discusType: true,
      reply: {
        include: {
          Users: true
        }
      },
      Users: true
    }
  })
  return result
}
