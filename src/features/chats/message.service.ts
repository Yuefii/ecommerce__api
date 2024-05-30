import prisma from '../../libs/prisma'

export class MessageService {
  static async createMessage(text: string, chatId: string, senderId: string) {
    const result = await prisma.messages.create({
      data: {
        text,
        chatId,
        senderId
      }
    })
    return result
  }

  static async getMessageByChatId(chatId: string) {
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
}
