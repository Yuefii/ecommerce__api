/* eslint-disable  @typescript-eslint/no-explicit-any */
export function ProductDTO(product: any) {
  return {
    product_id: product.productId,
    name: product.nama,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    quantity: product.quantity,
    images: Array.isArray(product.images)
      ? product.images.map((image: any) => ({
          img_id: image.imgId,
          color: image.color,
          colorCode: image.colorCode,
          img_url: image.url
        }))
      : [],
    owner: {
      owner_id: product.owner.userId,
      name: product.owner.nama,
      email: product.owner.email
    },
    discus: Array.isArray(product.discus)
      ? product.discus.map((discusItem: any) => ({
          discus_id: discusItem.discusId,
          user_id: discusItem.userId,
          discus_message: discusItem.message,
          name: discusItem.Users.nama,
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
                name: discusReplyItem.Users?.nama,
                reply_message: discusReplyItem.message,
                created_at: discusReplyItem.createdAt
              }))
            : [],
          created_at: discusItem.createdAt
        }))
      : [],
    review: Array.isArray(product.review)
      ? product.review.map((reviewItem: any) => ({
          review_id: reviewItem.reviewId,
          comment: reviewItem.comment,
          rating: reviewItem.rating,
          user: {
            user_id: reviewItem.users.userId,
            name: reviewItem.users.nama,
            email: reviewItem.users.email
          }
        }))
      : [],
    created_at: product.createdAt,
    updated_at: product.updatedAt
  }
}
export function ProductUpdateDTO(product: any) {
  return {
    product_id: product.productId,
    name: product.nama,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    quantity: product.quantity,
    images: product.images.map((image: any) => ({
      img_id: image.imgId,
      color: image.color,
      colorCode: image.colorCode,
      img_url: image.url
    })),
    updated_at: product.updatedAt
  }
}
