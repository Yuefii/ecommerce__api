import bcrypt from 'bcrypt'
import prisma from '../../src/libs/prisma'

export class ProductTest {
  static async delete() {
    await prisma.users.deleteMany({
      where: {
        email: 'testingproduct@gmail.com'
      }
    })
  }

  static async create() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testingproduct@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }

  static async findUnique() {
    const user = await prisma.users.findUnique({
      where: { email: 'testingproduct@gmail.com' }
    })
    return user?.userId
  }
}