import prisma from '../../../libs/prisma'

export const getProductBySearchService = async (
  keyword: string,
  limit: number
) => {
  const result = await prisma.products.findMany({
    where: {
      OR: [
        { nama: { contains: keyword } },
        { description: { contains: keyword } },
        { brand: { contains: keyword } },
        { category: { contains: keyword } }
      ]
    },
    include: {
      images: true,
      review: {
        include: {
          users: true
        }
      },
      owner: true
    },
    take: limit
  })
  return result
}
