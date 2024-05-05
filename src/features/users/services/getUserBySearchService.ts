import prisma from '../../../libs/prisma'

export const getUserBySearchService = async (
  keyword: string,
  limit: number
) => {
  const result = await prisma.users.findMany({
    where: {
      OR: [
        {
          nama: { contains: keyword }
        }
      ]
    },
    take: limit
  })
  return result
}
