export type UserUpdateData = {
  name: string
  username: string
  email: string
  address?: {
    create: Array<{
      address_label: string
      address_complete: string
      note_to_courier: string
      receiper_name: string
      phone_number: string
    }>
  }
  phoneNumber: string
  bio: string
  dateOfBirth?: {
    create: Array<{
      date: string
      month: string
      year: string
    }>
  }
  gender: string
}
