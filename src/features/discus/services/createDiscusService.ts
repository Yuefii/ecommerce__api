import prisma from '../../../libs/prisma'

export const createDiscusService = async (
  productId: string,
  userId: string,
  discusData: {
    message: string
    discusType: []
  }
) => {
  const { message, discusType } = discusData
  const result = await prisma.discus.create({
    data: {
      userId: userId,
      productId: productId,
      message,
      discusType: {
        createMany: {
          data: discusType
        }
      }
    },
    include: {
      discusType: true,
      reply: true
    }
  })

  return result
}
