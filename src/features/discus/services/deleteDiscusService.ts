import prisma from '../../../libs/prisma'

export const deleteDiscusService = async (discusId: string) => {
  const result = await prisma.discus.delete({
    where: {
      discusId: discusId
    }
  })
  return result
}
