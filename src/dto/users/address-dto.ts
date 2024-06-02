import { Address } from '@prisma/client'

export type addressResponse = {
  address_id?: string | null
  user_id?: string | null
  address_label?: string | null
  address_complete?: string | null
  note_to_courier?: string | null
  receiper_name?: string | null
  phone_number?: string | null
}

export type addressRequest = {
  addressLabel?: string
  addressComplete?: string
  noteToCourier?: string
  receiperName?: string
  phoneNumber?: string
}

export function toAddressResponse(address: Address) {
  return {
    address_id: address.id,
    user_id: address.userId,
    address_label: address.addressLabel,
    address_complete: address.addressComplete,
    note_to_courier: address.noteToCourier,
    receiper_name: address.receiperName,
    phone_number: address.phoneNumber
  }
}
