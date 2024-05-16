import bcrypt from 'bcrypt'
import prisma from '../../../libs/prisma'
import { ResponseError } from '../../../error/responseError'

export const createUserService = async (userData: {
  name: string
  email: string
  password: string
}) => {
  const { name, email, password } = userData
  const existingUser = await prisma.users.findUnique({
    where: {
      email: email
    }
  })
  if (existingUser) {
    throw new ResponseError('Email already use.', 400)
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
