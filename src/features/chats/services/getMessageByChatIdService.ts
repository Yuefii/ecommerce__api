import prisma from '../../../libs/prisma'

export const getMessageByChatIdService = async (chatId: string) => {
  const result = await prisma.messages.findMany({
    where: {
      chatId
    },
    include: {
      sender: true
    }
  })
  return result
}
