import { bucket } from '../../src/libs/firebase'
import prisma from '../../src/libs/prisma'
import bcrypt from 'bcrypt'

export class UserTest {
  static async delete() {
    await prisma.users.deleteMany({
      where: {
        email: 'testing@gmail.com'
      }
    })
  }

  static async deleteAddress() {
    let userId
    userId = await this.findUnique()
    const address = await prisma.address.deleteMany({
      where: {
        userId: userId
      }
    })
    return address
  }

  static async deleteDateOfBirth() {
    let userId
    userId = await this.findUnique()
    const address = await prisma.dateOfBirth.deleteMany({
      where: {
        userId: userId
      }
    })
    return address
  }

  static async deleteImage(userId) {
    const filePath = `profile_photos/${userId}.jpg`
    await bucket.file(filePath).delete()
  }

  static async create() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testing@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }

  static async findUnique() {
    const user = await prisma.users.findUnique({
      where: { email: 'testing@gmail.com' }
    })
    return user?.userId
  }
}
