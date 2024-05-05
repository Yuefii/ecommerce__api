import prisma from '../../../libs/prisma'

export const deleteUserService = async (userId: string) => {
  await prisma.users.delete({
    where: {
      userId: userId
    }
  })
}
