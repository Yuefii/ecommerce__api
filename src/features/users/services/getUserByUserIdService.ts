import prisma from '../../../libs/prisma'

export const getUserByUserIdService = async (userId: string) => {
  const result = await prisma.users.findUnique({
    where: {
      userId: userId
    },
    include: {
      products: true,
      review: {
        include: {
          product: true
        }
      },
      cart: {
        include: {
          product: true
        }
      },
      history: true,
      order: true,
      dateOfBirth: true
    }
  })
  return result
}
