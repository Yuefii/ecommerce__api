import { z, ZodType } from 'zod'

export class HistoryValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string(),
    category: z.string()
  })
}
