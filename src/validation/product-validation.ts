import { z, ZodType } from 'zod'

export class ProductValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number().min(0),
        brand: z.string(),
        category: z.string(),
    })
    static readonly UPDATE: ZodType = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().min(0).optional(),
        brand: z.string().optional(),
        category: z.string().optional(),
    })
}
