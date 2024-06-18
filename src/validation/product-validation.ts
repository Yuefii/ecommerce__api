import { z, ZodType } from 'zod'

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(0),
    brand: z.string(),
    category: z.string(),
    condition: z.string(),
    images: z
      .array(
        z.object({
          name: z.string().optional(),
          quantity: z.number().min(0).optional()
        })
      )
      .optional()
  })
  static readonly UPDATE: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    condition: z.string().optional(),
    images: z
      .array(
        z.object({
          name: z.string().optional(),
          quantity: z.number().min(0).optional()
        })
      )
      .optional()
  })
}
