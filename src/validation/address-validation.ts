import { z, ZodType } from 'zod'

export class AddressValidation {
  static readonly UPDATE: ZodType = z.object({
    addressLabel: z.string().optional(),
    addressComplete: z.string().optional(),
    regency: z.string().optional(),
    noteToCourier: z.string().optional(),
    receiperName: z.string().optional(),
    phoneNumber: z.string().optional(),
    isSelected: z.boolean().optional()
  })
}
