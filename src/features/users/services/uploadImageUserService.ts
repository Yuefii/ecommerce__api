import prisma from '../../../libs/prisma'

export const uploadImageUserService = async (
  userId: string,
  fileName: string
) => {
  return await prisma.users.update({
    where: {
      userId: userId
    },
    data: {
      imageUrl: fileName
    }
  })
}
