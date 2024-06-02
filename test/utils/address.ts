import prisma from '../../src/libs/prisma'
import bcrypt from 'bcrypt'

export class AddressTest {
  static update() {
    throw new Error('Method not implemented.')
  }
  static async create() {
    await prisma.users.create({
      data: {
        name: 'unit testing',
        email: 'testingAddress@gmail.com',
        password: await bcrypt.hash('unittesting', 12)
      }
    })
  }

  static async addAdress() {
    const result = await prisma.users.update({
      where: {
        email: 'testingAddress@gmail.com'
      },
      data: {
        address: {
          create: {
            addressLabel: 'testing update',
            addressComplete: 'testing update',
            regency: 'kab.tangerang',
            noteToCourier: 'testing update',
            receiperName: 'testing update',
            phoneNumber: '0888222222'
          }
        }
      },
      include: {
        address: true
      }
    })
    return result.address[0].id
  }

  static async delete() {
    await prisma.users.deleteMany({
      where: {
        email: 'testingAddress@gmail.com'
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

  static async findUnique() {
    const user = await prisma.users.findUnique({
      where: { email: 'testingAddress@gmail.com' }
    })
    return user?.userId
  }
}
