import { z } from 'zod'

export const userRegisterSchema = z.object({
  nama: z.string().min(3).max(100),
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
  alamat: z.string().min(1).max(200).optional(),
  no_telp: z.string().min(1).max(15).optional()
})

export const userLoginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(5).max(100)
})

export const userUpdateSchema = z.object({
  nama: z.string().min(3).max(100).optional(),
  alamat: z.string().min(1).max(200).optional(),
  no_telp: z.string().min(1).max(15).optional()
})
