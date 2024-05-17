import prisma from '../../libs/prisma'

export class ChatService {
  async createMessage(text: string, chatId: string, senderId: string) {
    const result = await prisma.messages.create({
      data: {
        text,
        chatId,
        senderId
      }
    })
    return result
  }

  async createRoomChat(participants: string[]) {
    const result = await prisma.chat.create({
      data: {
        participants: {
          connect: participants.map((userId) => ({ userId }))
        }
      }
    })
    return result
  }

  async getAllRoomChats() {
    const result = await prisma.chat.findMany({
      include: {
        participants: true
      }
    })
    return result
  }

  async getMessageByChatId(chatId: string) {
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
