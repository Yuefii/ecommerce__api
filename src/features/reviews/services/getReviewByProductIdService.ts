import prisma from '../../../libs/prisma'

export const getReviewByProductIdService = async (productId: string) => {
  const result = await prisma.reviews.findMany({
    where: {
      productId: productId
    },
    include: {
      users: true
    }
  })
  return result
}
