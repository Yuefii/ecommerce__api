import { z, ZodType } from 'zod'

export class DiscusValidation {
  static readonly CREATE: ZodType = z.object({
    message: z.string(),
    discusType: z.array(
      z.object({
        name: z.string()
      })
    )
  })
}
