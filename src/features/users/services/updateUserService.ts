import prisma from '../../../libs/prisma'
import { ResponseError } from '../../../error/responseError'

interface UserUpdateData {
  name: string
  username: string
  email: string
  address?: {
    create: Array<{
      address_label: string
      address_complete: string
      note_to_courier: string
      receiper_name: string
      phone_number: string
    }>
  }
  phoneNumber: string
  bio: string
  dateOfBirth?: {
    create: Array<{
      date: string
      moon: string
      year: string
    }>
  }
  gender: string
}

export const updateUserService = async (
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
      moon: string
      year: string
    }>
    gender?: 'pria' | 'wanita'
  }
) => {
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

  if (gender) {
    if (gender !== 'pria' && gender !== 'wanita') {
      throw new Error("Gender must be either 'pria' or 'wanita'")
    }
    dataToUpdate.gender = gender
  }

  return await prisma.$transaction(async (prisma) => {
    if (address) {
      const existingAddressesCount = await prisma.address.count({
        where: { userId }
      })

      const newAddressesCount = address.length
      if (existingAddressesCount + newAddressesCount > 3) {
        throw new ResponseError('User cannot have more than 3 addresses', 400)
      }

      dataToUpdate.address = {
        create: address
      }
    }

    if (dateOfBirth) {
      await prisma.dateOfBirth.deleteMany({
        where: { userId }
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
