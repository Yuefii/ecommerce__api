import prisma from '../../../libs/prisma'

export const getAllUsersService = async () => {
  const result = await prisma.users.findMany({
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
      dateOfBirth: true,
      address: true
    }
  })
  return result
}
