import prisma from '../../../libs/prisma'

export const createRoomChatService = async (participants: string[]) => {
  const result = await prisma.chat.create({
    data: {
      participants: {
        connect: participants.map((userId) => ({ userId }))
      }
    }
  })
  return result
}
