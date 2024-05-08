import prisma from '../../../libs/prisma'

export const createMessageService = async (
  text: string,
  chatId: string,
  senderId: string
) => {
  const result = await prisma.messages.create({
    data: {
      text,
      chatId,
      senderId
    }
  })
  return result
}
