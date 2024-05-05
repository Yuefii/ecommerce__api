import prisma from '../../../libs/prisma'

export const getProductByIdService = async (productId: string) => {
  const result = await prisma.products.findUnique({
    where: {
      productId: productId
    },
    include: {
      images: true,
      review: {
        include: {
          users: true
        }
      },
      discus: {
        include: {
          Users: true,
          discusType: true,
          reply: {
            include: {
              Users: true
            }
          }
        }
      },
      owner: true
    }
  })
  return result
}
