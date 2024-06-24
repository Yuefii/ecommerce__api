import {
  Discus,
  DiscusType,
  Images,
  Products,
  Reply,
  Reviews,
  Users
} from '@prisma/client'

export type ProductResponse = {
  product_id: string
  name: string
  description: string
  price: number
  brand: string
  category: string
  total_quantity: number
  condition: string
  images: Array<{
    img_id: string
    name: string
    quantity: number | 0
    img_url: string | null
    order: number | 1
  }>
  owner: {
    user_id: string
    name: string | null
    username: string | null
    avatar: string | null
  }
  review: Array<{
    review_id: string
    comment: string
    rating: number
    users: {
      user_id: string
      name: string | null
      username: string | null
      avatar: string | null
    }
  }>
  discus: Array<{
    discus_id: string
    discus_message: string
    // users: {
    //   user_id: string
    //   name: string | null
    //   username: string | null
    //   avatar: string | null
    // }
    discus_type: Array<{
      name: string
    }>
    discus_reply: Array<{
      reply_id: string
      reply_message: string
      // users: {
      //   user_id: string
      //   name: string | null
      //   username: string | null
      //   avatar: string | null
      // }
      created_at: Date
    }>
    created_at: Date
  }>
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
  condition: string
  images?: {
    create: Array<{
      name: string
      quantity: number
    }>
  }
}

export function toProductResponse(
  product: Products & {
    images: Images[]
    owner: Users
    review: (Reviews & { users: Users })[]
    discus: (Discus & {
      // users: Users
      discusType: DiscusType[]
      reply: Reply[]
      /*  types yang error */
      /* reply: (Reply & { users: Users })[] */
    })[]
  }
): ProductResponse {
  const Images = product.images.map((item) => ({
    img_id: item.imgId,
    name: item.name,
    quantity: item.quantity,
    img_url: item.url,
    order: item.order
  }))

  const totalQuantity = Images.reduce((total, item) => total + item.quantity, 0)

  return {
    product_id: product.productId,
    name: product.name,
    description: product.description,
    brand: product.brand,
    price: product.price,
    category: product.category,
    total_quantity: totalQuantity,
    condition: product.condition,
    images: Images,
    owner: {
      user_id: product.owner.userId,
      name: product.owner.name,
      username: product.owner.username,
      avatar: product.owner.imageUrl
    },
    review: product.review
      ? product.review.map((item) => ({
          review_id: item.reviewId,
          comment: item.comment,
          rating: item.rating,
          users: {
            user_id: item.users.userId,
            name: item.users.name,
            username: item.users.username,
            avatar: item.users.imageUrl
          }
        }))
      : [],
    discus: product.discus
      ? product.discus.map((item) => ({
          discus_id: item.discusId,
          discus_message: item.message,
          // users: {
          //   user_id: item.users.userId,
          //   name: item.users.name,
          //   username: item.users.username,
          //   avatar: item.users.imageUrl
          // },
          discus_type: item.discusType.map((item) => ({
            name: item.name
          })),
          discus_reply: item.reply.map((item) => ({
            reply_id: item.replyId,
            reply_message: item.message,
            // users: {
            //   user_id: item.users.userId,
            //   name: item.users.name,
            //   username: item.users.username,
            //   avatar: item.users.imageUrl
            // },
            created_at: item.createdAt
          })),
          created_at: item.createdAt
        }))
      : [],
    created_at: product.createdAt,
    updated_at: product.updateAt
  }
}
