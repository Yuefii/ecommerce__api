import prisma from '../../../libs/prisma'

export const deleteReviewService = async (reviewId: string) => {
  const result = await prisma.reviews.delete({
    where: {
      reviewId: reviewId
    }
  })
  return result
}
