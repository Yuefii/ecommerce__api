import bcrypt from 'bcrypt'
import prisma from '../../../libs/prisma'
import { ResponseError } from '../../../error/responseError'

export const changePasswordService = async (
  userId: string,
  userData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
) => {
  const { currentPassword, newPassword, confirmPassword } = userData
  const user = await prisma.users.findUnique({
    where: {
      userId: userId
    }
  })
  const passwordMatch = await bcrypt.compare(
    currentPassword,
    user?.password || ''
  )

  if (!passwordMatch) {
    throw new ResponseError('old password does not match', 400)
  }
  if (newPassword !== confirmPassword) {
    throw new ResponseError('password does not match', 400)
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12)
  const result = await prisma.users.update({
    where: {
      userId: userId
    },
    data: {
      password: hashedPassword
    }
  })
  return result
}
