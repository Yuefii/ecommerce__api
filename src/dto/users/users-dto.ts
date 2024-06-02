import { Address, DateOfBirth, Products, Users } from '@prisma/client'

export type UserResponse = {
  user_id?: string | null
  chat_id?: string | null
  name: string | null
  username?: string | null
  email: string
  avatar?: string | null
  bio?: string | null
  gender?: string | null
  phone_number?: string | null
  address?: Array<{
    address_id?: string | null
    address_label?: string | null
    address_complete?: string | null
    regency?: string | null
    note_to_courier?: string | null
    receiper_name?: string | null
    phone_number?: string | null
    is_selected?: boolean
  }>
  date_of_birth?: Array<{
    date?: string | null
    month?: string | null
    year?: string | null
  }>
  products?: Array<{
    product_id?: string | null
    name?: string | null
    category?: string | null
  }>
  created_at: Date
  updated_at?: Date | null
}

export type CreateUserResponse = {
  user_id?: string
  name?: string | null
  email: string
}

export type CreateUserRequest = {
  name: string
  email: string
  password: string
}

export type UpdateUserRequest = {
  name: string
  username: string
  email: string
  address?: {
    create: Array<{
      addressLabel?: string
      addressComplete?: string
      regency?: string
      noteToCourier?: string
      receiperName?: string
      phoneNumber?: string
      isSelected?: boolean
    }>
  }
  phoneNumber: string
  bio: string
  dateOfBirth?: {
    create: Array<{
      date?: string
      month?: string
      year?: string
    }>
  }
  gender?: 'pria' | 'wanita' | string
}

export type LoginUserRequest = {
  email: string
  password: string
}

export type ChangePasswordUserRequest = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function toCreateUserResponse(user: Users): CreateUserResponse {
  return {
    user_id: user.userId,
    name: user.name,
    email: user.email
  }
}

export function toUserResponse(
  user: Users & {
    address: Address[]
    dateOfBirth: DateOfBirth[]
    products: Products[]
  }
): UserResponse {
  return {
    user_id: user.userId,
    chat_id: user.ChatId,
    name: user.name,
    username: user.username,
    email: user.email,
    avatar: user.imageUrl,
    bio: user.bio,
    gender: user.gender,
    phone_number: user.phoneNumber,
    address: user.address.map((item) => ({
      address_id: item.id,
      address_label: item.addressLabel,
      address_complete: item.addressComplete,
      regency: item.regency,
      note_to_courier: item.noteToCourier,
      receiper_name: item.receiperName,
      phone_number: item.phoneNumber,
      is_selected: item.isSelected
    })),
    date_of_birth: user.dateOfBirth.map((item) => ({
      date: item.date,
      month: item.month,
      year: item.year
    })),
    products: user.products.map((item) => ({
      product_id: item.productId,
      name: item.nama,
      category: item.category
    })),
    created_at: user.createdAt,
    updated_at: user.updateAt
  }
}
