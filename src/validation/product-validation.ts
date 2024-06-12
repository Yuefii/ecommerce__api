import { z, ZodType } from 'zod'

export class ProductValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number().min(0),
        brand: z.string(),
        category: z.string(),
    })
}
