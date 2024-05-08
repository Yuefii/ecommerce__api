import prisma from '../../../libs/prisma'

export const getAllRoomChatService = async () => {
  const result = await prisma.chat.findMany({
    include: {
      participants: true
    }
  })
  return result
}
