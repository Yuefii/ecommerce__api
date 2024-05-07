/* eslint-disable  @typescript-eslint/no-explicit-any */

export class UserDTO {
  constructor() {}

  public fromGet(result: any) {
    return {
      user_id: result.userId,
      name: result.nama,
      email: result.email,
      address: result.alamat,
      phone_number: result.no_telp,
      history_search: Array.isArray(result.history)
        ? result.history.map((userHistory: any) => ({
            history_id: userHistory.historyId,
            title: userHistory.title,
            category: userHistory.category
          }))
        : [],
      products: Array.isArray(result.products)
        ? result.products.map((userProduct: any) => ({
            product_id: userProduct.productId,
            name: userProduct.nama,
            brand: userProduct.brand,
            category: userProduct.category
          }))
        : [],
      reviews: Array.isArray(result.review)
        ? result.review.map((userReview: any) => ({
            review_id: userReview.reviewId,
            product_name: userReview.product.nama,
            rating: userReview.rating,
            comment: userReview.comment
          }))
        : [],
      carts: Array.isArray(result.cart)
        ? result.cart.map((userCart: any) => ({
            cart_id: userCart.cartId,
            name: userCart.product.nama,
            quantity: userCart.quantity,
            created_at: userCart.createdAt
          }))
        : [],
      created_at: result.createdAt,
      updated_at: result.updatedAt
    }
  }

  public fromCreate(result: any) {
    return {
      user_id: result.userId,
      name: result.nama,
      email: result.email,
      address: result.alamat,
      phone_number: result.no_telp,
      updated_at: result.updatedAt
    }
  }

  public fromSearch(result: any) {
    return {
      user_id: result.userId,
      name: result.nama,
      email: result.email,
      phone_number: result.no_telp,
      created_at: result.createdAt,
      updated_at: result.updatedAt
    }
  }
}
