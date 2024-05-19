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
    },
    take: limit
  })
  return result
}
