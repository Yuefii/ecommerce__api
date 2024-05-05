import prisma from '../../../libs/prisma'

export const getAllProductService = async (offset: number, limit: number) => {
  const result = await prisma.products.findMany({
    include: {
      images: true,
      review: {
        include: {
          users: true
        }
      },
      owner: true
    },
    skip: offset,
    take: limit
  })
  return result
}
