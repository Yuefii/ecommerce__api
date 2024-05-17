import prisma from '../../../libs/prisma'

interface UserUpdateData {
  name: string
  username: string
  email: string
  address: string
  phoneNumber: string
  bio: string
  dateOfBirth?: {
    createMany: { data: [] }
  }
  gender: string
}

export const updateUserService = async (
  userId: string,
  userData: {
    name: string
    username: string
    email: string
    address: string
    phoneNumber: string
    bio: string
    dateOfBirth?: []
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
    address,
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

  if (dateOfBirth) {
    dataToUpdate.dateOfBirth = {
      createMany: { data: dateOfBirth }
    }
  }
  const result = await prisma.users.update({
    where: {
      userId: userId
    },
    data: dataToUpdate,
    include: {
      dateOfBirth: true
    }
  })
  return result
}
