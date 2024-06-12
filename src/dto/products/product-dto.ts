import { Images, Products, Users } from '@prisma/client'
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
  }
  created_at: Date
  updated_at: Date
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

export function toProductResponse(
  product: Products & { images: Images[], owner: Users }
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
    },
    created_at: product.createdAt,
    updated_at: product.updateAt
  }
}
