import { z, ZodType } from 'zod'

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100)
  })

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().max(100),
    password: z.string().min(8).max(100)
  })

  static readonly UPDATE: ZodType = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    bio: z.string().optional(),
    gender: z.string().optional(),
    address: z
      .array(
        z.object({
          addressLabel: z.string().optional(),
          addressComplete: z.string().optional(),
          regency: z.string().optional(),
          noteToCourier: z.string().optional(),
          receiperName: z.string().optional(),
          phoneNumber: z.string().optional(),
          isSelected: z.boolean().optional()
        })
      )
      .optional(),
    dateOfBirth: z
      .array(
        z.object({
          date: z.string().optional(),
          month: z.string().optional(),
          year: z.string().optional()
        })
      )
      .optional()
  })
}
