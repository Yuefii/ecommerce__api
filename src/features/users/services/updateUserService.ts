import prisma from '../../../libs/prisma'

interface UserUpdateData {
  name: string
  username: string
  address: string
  phoneNumber: string
  bio: string
  dateOfBirth?: {
    createMany: { data: [] }
  }
}

export const updateUserService = async (
  userId: string,
  userData: {
    name: string
    username: string
    address: string
    phoneNumber: string
    bio: string
    dateOfBirth?: []
  }
) => {
  const { name, username, address, phoneNumber, bio, dateOfBirth } = userData
  const dataToUpdate: UserUpdateData = {
    name,
    username,
    address,
    phoneNumber,
    bio
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
