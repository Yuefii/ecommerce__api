import { z } from 'zod'

export const userRegisterSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().max(100),
  password: z.string().min(8).max(100)
})

export const userLoginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(5).max(100)
})
