import prisma from '../../src/libs/prisma'
import bcrypt from 'bcrypt'

export class HistoryTest {
  static async delete() {
    await prisma.users.deleteMany({
      where: {
        email: 'testinghistory@gmail.com'
      }
    })
  }

  static async create() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testinghistory@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }

  static async findUnique() {
    const user = await prisma.users.findUnique({
      where: { email: 'testinghistory@gmail.com' }
    })
    return user?.userId
  }

  static async createHistory(userId) {
    await prisma.history.create({
      data: {
        userId: userId,
        title: 'testing title',
        category: 'testing category'
      }
    })
  }

  static async findHistory(userId) {
    const history = await prisma.history.findMany({
      where: { userId: userId }
    })
    return history.map((item) => item.historyId)
  }
}
