import {
  Discus,
  DiscusType,
  Images,
  Products,
  Reply,
  Reviews,
  Users
} from '@prisma/client'
import { UploadedFile } from 'express-fileupload'

export type ProductResponse = {
  product_id: string
  name: string
  description: string
  price: number
  brand: string
  category: string
  images: Array<{
    img_id: string | null
    name: string | null
    quantity: number | 0
    img_url: string | null
  }>
  owner: {
    user_id: string
    name: string | null
    username: string | null
    avatar: string | null
  },
  review: Array<{
    review_id: string
    comment: string,
    rating: number,
    users: {
      user_id: string
      name: string | null
      username: string | null
      avatar: string | null
    },
  }>
  discus: Array<{
    discus_id: string
    discus_message: string
    discus_type: Array<{
      name: string
    }>
    discus_reply: Array<{
      reply_id: string
      reply_message: string
      created_at: Date
    }>
    created_at: Date
  }>
  created_at: Date
  updated_at: Date
}

export type ProductImagesResponse = {
  img_id: string
  product_id: string
  name: string
  quantity: number
  img_url: string
}

export type CreateProductRequest = {
  ownerId: string
  name: string
  description: string
  price: number
  brand: string
  category: string
  images: UploadedFile[]
}

export type ProductImagesRequest = {
  imgId: string
  name?: string
  quantity?: number
  url?: UploadedFile | UploadedFile[]
}

export function toProductImagesResponse(image: Images): ProductImagesResponse {
  return {
    img_id: image.imgId,
    product_id: image.productId,
    name: image.name,
    quantity: image.quantity,
    img_url: image.url
  }
}

export function toProductResponse(
  product: Products & {
    images: Images[]
    owner: Users
    review: (Reviews & { users: Users })[]
    discus: (Discus & { discusType: DiscusType[]; reply: Reply[] })[]
  }
): ProductResponse {
  return {
    product_id: product.productId,
    name: product.name,
    description: product.description,
    brand: product.brand,
    price: product.price,
    category: product.category,
    images: product.images.map((item) => ({
      img_id: item.imgId,
      name: item.name,
      quantity: item.quantity,
      img_url: item.url
    })),
    owner: {
      user_id: product.owner.userId,
      name: product.owner.name,
      username: product.owner.username,
      avatar: product.owner.imageUrl
    },
    review: product.review ? product.review.map((item) => ({
      review_id: item.reviewId,
      comment: item.comment,
      rating: item.rating,
      users: {
        user_id: item.users.userId,
        name: item.users.name,
        username: item.users.username,
        avatar: item.users.imageUrl
      }
    })) : [],
    discus: product.discus ? product.discus.map((item) => ({
      discus_id: item.discusId,
      discus_message: item.message,
      discus_type: item.discusType.map((item) => ({
        name: item.name
      })),
      discus_reply: item.reply.map((item) => ({
        reply_id: item.replyId,
        reply_message: item.message,
        created_at: item.createdAt
      })),
      created_at: item.createdAt
    })) : [],
    created_at: product.createdAt,
    updated_at: product.updateAt
  }
}
