import prisma from '../../src/libs/prisma'
import bcrypt from 'bcrypt'

export class MessageTest {
  static async createUser1() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testingMessage1@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }
  static async createUser2() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testingMessage2@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }

  static async findUniqueUser1() {
    const user = await prisma.users.findUnique({
      where: { email: 'testingMessage1@gmail.com' }
    })
    return user?.userId
  }

  static async findUniqueUser2() {
    const user = await prisma.users.findUnique({
      where: { email: 'testingMessage2@gmail.com' }
    })
    return user?.userId
  }

  static async deleteUser1() {
    await prisma.users.deleteMany({
      where: {
        email: 'testingMessage1@gmail.com'
      }
    })
  }
  static async deleteUser2() {
    await prisma.users.deleteMany({
      where: {
        email: 'testingMessage2@gmail.com'
      }
    })
  }

  static async deleteChat(chatId) {
    await prisma.chat.deleteMany({
      where: {
        chatId: chatId
      }
    })
  }

  static async deleteMessage(messageId) {
    await prisma.messages.deleteMany({
      where: {
        messageId: messageId
      }
    })
  }

  static async createChat(userId1, userId2) {
    const result = await prisma.chat.create({
      data: {
        participants: {
          connect: [{ userId: userId1 }, { userId: userId2 }]
        }
      }
    })
    return result.chatId
  }

  static async createMessage(chatId) {
    const user1Id = await this.findUniqueUser1()
    const result = await prisma.messages.create({
      data: {
        text: 'hello testing',
        chatId: chatId,
        senderId: user1Id
      }
    })
    return result.messageId
  }
}
