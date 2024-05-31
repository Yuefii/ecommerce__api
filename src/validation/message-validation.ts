import { z, ZodType } from 'zod'

export class MessageValidation {
  static readonly CREATE: ZodType = z.object({
    text: z.string()
  })
}
