/* eslint-disable  @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import path from 'path'
import bcrypt from 'bcrypt'
import prisma from '../../libs/prisma'
import * as dto from '../../dto/users/users-dto'

import { bucket } from '../../libs/firebase'
import { UploadedFile } from 'express-fileupload'
import { ResponseError } from '../../error/response-error'
import { jwtSecret } from '../../utils/env'
import { Validation } from '../../utils/validation'
import { UserValidation } from '../../validation/user-validation'

export class UserService {
  static async create(
    request: dto.CreateUserRequest
  ): Promise<dto.CreateUserResponse> {
    const createRequest = Validation.validate(UserValidation.REGISTER, request)
    const exitingUser = await prisma.users.findUnique({
      where: {
        email: createRequest.email
      },
      include: {
        address: true
      }
    })
    if (exitingUser) {
      throw new ResponseError(400, 'Email already use.')
    }
    createRequest.password = await bcrypt.hash(createRequest.password, 12)
    const result = await prisma.users.create({
      data: createRequest
    })
    return dto.toCreateUserResoinse(result)
  }

  static async login(request: dto.LoginUserRequest) {
    if (!request.email && !request.password) {
      throw new ResponseError(400, 'Email & Password not valid')
    }
    const user = await prisma.users.findUnique({
      where: {
        email: request.email
      }
    })
    if (!user) {
      throw new ResponseError(400, 'Email & Password not valid')
    }
    const passwordMatch = await bcrypt.compare(request.password, user?.password)
    if (!passwordMatch) {
      throw new ResponseError(400, 'Email & Password not valid')
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

  static async changePassword(
    userId: string,
    request: dto.ChangePasswordUserRequest
  ) {
    const user = await prisma.users.findUnique({
      where: {
        userId
      }
    })
    if (!user) {
      throw new ResponseError(404, `User with id ${userId} not found`)
    }
    const passwordMatch = await bcrypt.compare(
      request.currentPassword,
      user?.password || ''
    )
    if (!passwordMatch) {
      throw new ResponseError(400, 'Old password does not match')
    }
    if (request.newPassword !== request.confirmPassword) {
      throw new ResponseError(400, 'Password does not match')
    }
    const hashedPassword = await bcrypt.hash(request.newPassword, 12)
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

  static async getById(userId: string): Promise<dto.UserResponse> {
    const result = await prisma.users.findUnique({
      where: {
        userId
      },
      include: {
        address: true,
        dateOfBirth: true
      }
    })
    if (!result) {
      throw new ResponseError(404, `User with id ${userId} not found`)
    }
    return dto.toUserResponse(result)
  }

  static async update(
    userId: string,
    request: dto.UpdateUserRequest
  ): Promise<dto.UserResponse> {
    const createRequest = Validation.validate(UserValidation.UPDATE, request)
    const dataToUpdate: dto.UpdateUserRequest = {
      name: createRequest.name,
      username: createRequest.username,
      email: createRequest.email,
      phoneNumber: createRequest.phoneNumber,
      bio: createRequest.bio,
      gender: ''
    }

    try {
      return await prisma.$transaction(async (prisma) => {
        if (createRequest.gender) {
          if (
            createRequest.gender !== 'pria' &&
            createRequest.gender !== 'wanita'
          ) {
            throw new ResponseError(400, 'Gender must be either pria or wanita')
          }
          dataToUpdate.gender = createRequest.gender
        }
        const addresses =
          createRequest.address && Array.isArray(createRequest.address)
            ? createRequest.address
            : createRequest.address && createRequest.address.create
              ? createRequest.address.create
              : []
        if (addresses.length > 0) {
          const existingAddressesCount = await prisma.address.count({
            where: { userId }
          })
          const newAddressesCount = addresses.length
          if (existingAddressesCount + newAddressesCount > 3) {
            throw new ResponseError(
              400,
              'User cannot have more than 3 addresses'
            )
          }
          dataToUpdate.address = {
            create: addresses
          }
        }
        const dateOfBirth =
          createRequest.dateOfBirth && Array.isArray(createRequest.dateOfBirth)
            ? createRequest.dateOfBirth
            : createRequest.dateOfBirth && createRequest.dateOfBirth.create
              ? createRequest.dateOfBirth.create
              : []
        if (dateOfBirth.length > 0) {
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
        return dto.toUserResponse(result)
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new ResponseError(404, `User with id ${userId} not found`)
      }
      throw error
    }
  }

  static async uploadImage(userId: string, imageUrl: UploadedFile) {
    if (!imageUrl) {
      throw new ResponseError(400, 'No files uploaded')
    }
    const fileExtension = path.extname(imageUrl.name)
    const fileName = `${userId}${fileExtension}`
    const blob = bucket.file(`profile_photos/${fileName}`)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: imageUrl.mimetype
      }
    })
    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err)
        reject(new ResponseError(400, 'Failed to upload image'))
      })

      blobStream.on('finish', async () => {
        try {
          const publicUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-01-2050'
          })
          await prisma.users.update({
            where: { userId },
            data: { imageUrl: publicUrl[0] }
          })
          resolve(publicUrl[0])
        } catch (error: any) {
          if (error.code === 'P2025') {
            reject(new ResponseError(404, `User with id ${userId} not found`))
          } else {
            reject(
              new ResponseError(400, 'Failed to get public URL or update user.')
            )
          }
        }
      })
      blobStream.end(imageUrl.data)
    })
  }

  static async delete(userId: string) {
    try {
      await prisma.users.delete({
        where: {
          userId
        }
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new ResponseError(404, `User with id ${userId} not found`)
      }
      throw error
    }
  }
}
