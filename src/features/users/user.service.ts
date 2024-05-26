import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '../../libs/prisma'

import { ResponseError } from '../../error/response-error'
import { UserUpdateData } from './types/user-update-type'
import { jwtSecret } from '../../utils/env'

export class UserService {
  async createUser(userData: {
    name: string
    email: string
    password: string
  }) {
    const { name, email, password } = userData
    const exitingUser = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (exitingUser) {
      throw new ResponseError(400, 'Email already use.')
    }
    const hashPassword = await bcrypt.hash(password, 12)
    const result = await prisma.users.create({
      data: {
        email,
        name,
        password: hashPassword
      }
    })
    return result
  }

  async getAllUser() {
    const result = await prisma.users.findMany({
      include: {
        products: true,
        review: {
          include: {
            product: true
          }
        },
        history: true,
        dateOfBirth: true,
        address: true
      }
    })
    return result
  }

  async getUserById(userId: string) {
    const result = await prisma.users.findUnique({
      where: {
        userId
      },
      include: {
        products: true,
        review: {
          include: {
            product: true
          }
        },
        history: true,
        order: true,
        dateOfBirth: true,
        address: true
      }
    })
    return result
  }

  async getUserBySearch(keyword: string, limit: number) {
    const result = await prisma.users.findMany({
      where: {
        OR: [
          {
            name: { contains: keyword }
          }
        ]
      },
      take: limit
    })
    return result
  }

  async updateUser(
    userId: string,
    userData: {
      name: string
      username: string
      email: string
      address?: Array<{
        address_label: string
        address_complete: string
        note_to_courier: string
        receiper_name: string
        phone_number: string
      }>
      phoneNumber: string
      bio: string
      dateOfBirth?: Array<{
        date: string
        month: string
        year: string
      }>
      gender?: 'pria' | 'wanita' | string
    }
  ) {
    const {
      name,
      username,
      email,
      address,
      phoneNumber,
      bio,
      dateOfBirth,
      gender
    } = userData
    const dataToUpdate: UserUpdateData = {
      name,
      username,
      email,
      phoneNumber,
      bio,
      gender: ''
    }

    return await prisma.$transaction(async (prisma) => {
      if (gender) {
        if (gender !== 'pria' && gender !== 'wanita') {
          throw new ResponseError(400, 'Gender must be either pria or wanita')
        }
        dataToUpdate.gender = gender
      }
      if (address) {
        const existingAddressesCount = await prisma.address.count({
          where: { userId }
        })
        const newAddressesCount = address.length
        if (existingAddressesCount + newAddressesCount > 3) {
          throw new ResponseError(400, 'User cannot have more than 3 addresses')
        }
        dataToUpdate.address = {
          create: address
        }
      }
      if (dateOfBirth) {
        await prisma.dateOfBirth.deleteMany({
          where: {
            userId
          }
        })
        dataToUpdate.dateOfBirth = {
          create: dateOfBirth
        }
      }
      const result = await prisma.users.update({
        where: {
          userId
        },
        data: dataToUpdate,
        include: {
          dateOfBirth: true,
          address: true
        }
      })
      return result
    })
  }

  async changePasswordUser(
    userId: string,
    userData: {
      currentPassword: string
      newPassword: string
      confirmPassword: string
    }
  ) {
    const { currentPassword, newPassword, confirmPassword } = userData
    const user = await prisma.users.findUnique({
      where: {
        userId
      }
    })
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user?.password || ''
    )
    if (!passwordMatch) {
      throw new ResponseError(400, 'old password does not match')
    }
    if (newPassword !== confirmPassword) {
      throw new ResponseError(400, 'Password does not match')
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const result = await prisma.users.update({
      where: {
        userId
      },
      data: {
        password: hashedPassword
      }
    })
    return result
  }

  async uploadImageUser(userId: string, fileName: string) {
    return await prisma.users.update({
      where: {
        userId
      },
      data: {
        imageUrl: fileName
      }
    })
  }

  async loginUser(userData: { email: string; password: string }) {
    const { email, password } = userData
    if (!email && !password) {
      throw new ResponseError(400, 'Email & Password not valid')
    }
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw new ResponseError(400, 'Email doesnt exist')
    }
    const passwordMatch = await bcrypt.compare(password, user?.password)
    if (!passwordMatch) {
      throw new ResponseError(400, 'Password not valid')
    }
    const token = jwt.sign(
      {
        userId: user.userId
      },
      jwtSecret,
      {
        expiresIn: '12h'
      }
    )
    return token
  }

  async deleteUser(userId: string) {
    await prisma.users.delete({
      where: {
        userId
      }
    })
  }
}
