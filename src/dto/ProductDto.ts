/* eslint-disable  @typescript-eslint/no-explicit-any */

import { baseUrl } from '../utils/env'

export class ProductDTO {
  public fromGet(result: any) {
    return {
      product_id: result.productId,
      name: result.nama,
      description: result.description,
      price: result.price,
      brand: result.brand,
      category: result.category,
      quantity: result.quantity,
      images: Array.isArray(result.images)
        ? result.images.map((image: any) => ({
            img_id: image.imgId,
            color: image.color,
            colorCode: image.colorCode,
            img_url: image.url
          }))
        : [],
      owner: {
        owner_id: result.owner.userId,
        name: result.owner.name,
        avatar: baseUrl + 'public/user/' + result.owner.imageUrl,
        email: result.owner.email
      },
      discus: Array.isArray(result.discus)
        ? result.discus.map((discusItem: any) => ({
            discus_id: discusItem.discusId,
            user_id: discusItem.userId,
            discus_message: discusItem.message,
            name: discusItem.Users?.name,
            avatar: baseUrl + 'public/user/' + discusItem.Users?.imageUrl,
            discus_type: Array.isArray(discusItem.discusType)
              ? discusItem.discusType.map((dicusTypeItem: any) => ({
                  name: dicusTypeItem.name
                }))
              : [],
            discus_reply: Array.isArray(discusItem.reply)
              ? discusItem.reply.map((discusReplyItem: any) => ({
                  discus_id: discusReplyItem.discusId,
                  reply_id: discusReplyItem.replyId,
                  user_id: discusReplyItem.userId,
                  name: discusReplyItem.Users?.name,
                  avatar:
                    baseUrl + 'public/user/' + discusReplyItem.Users?.imageUrl,
                  reply_message: discusReplyItem.message,
                  created_at: discusReplyItem.createdAt
                }))
              : [],
            created_at: discusItem.createdAt
          }))
        : [],
      review: Array.isArray(result.review)
        ? result.review.map((reviewItem: any) => ({
            review_id: reviewItem.reviewId,
            comment: reviewItem.comment,
            rating: reviewItem.rating,
            user: {
              user_id: reviewItem.users.userId,
              name: reviewItem.users.name,
              email: reviewItem.users.email
            }
          }))
        : [],
      created_at: result.createdAt,
      updated_at: result.updateAt
    }
  }

  public fromCreate(result: any) {
    return {
      product_id: result.productId,
      name: result.name,
      description: result.description,
      price: result.price,
      brand: result.brand,
      category: result.category,
      quantity: result.quantity,
      images: Array.isArray(result.images)
        ? result.images.map((image: any) => ({
            img_id: image.imgId,
            color: image.color,
            colorCode: image.colorCode,
            img_url: image.url
          }))
        : [],
      owner: {
        owner_id: result.owner.userId,
        name: result.owner.name,
        avatar: baseUrl + 'public/user/' + result.owner.imageUrl,
        email: result.owner.email
      },
      created_at: result.createdAt,
      updated_at: result.updatedAt
    }
  }
}
