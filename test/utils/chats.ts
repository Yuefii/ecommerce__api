import prisma from '../../src/libs/prisma'
import bcrypt from 'bcrypt'

export class ChatTest {
  static async deleteUser1() {
    await prisma.users.deleteMany({
      where: {
        email: 'testingChat1@gmail.com'
      }
    })
  }
  static async deleteUser2() {
    await prisma.users.deleteMany({
      where: {
        email: 'testingChat2@gmail.com'
      }
    })
  }

  static async createUser1() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testingChat1@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }
  static async createUser2() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testingChat2@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }

  static async findUniqueUser1() {
    const user = await prisma.users.findUnique({
      where: { email: 'testingChat1@gmail.com' }
    })
    return user?.userId
  }

  static async findUniqueUser2() {
    const user = await prisma.users.findUnique({
      where: { email: 'testingChat2@gmail.com' }
    })
    return user?.userId
  }
}
