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
