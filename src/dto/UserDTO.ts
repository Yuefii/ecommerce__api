/* eslint-disable  @typescript-eslint/no-explicit-any */

import { baseUrl } from '../utils/env'

export class UserDTO {
  public fromGet(result: any) {
    return {
      user_id: result.userId,
      name: result.name,
      username: result.username,
      avatar: baseUrl + 'public/user/' + result.imageUrl,
      bio: result.bio,
      date_of_birth: Array.isArray(result.dateOfBirth)
        ? result.dateOfBirth.map((item: any) => ({
            date: item.date,
            moon: item.moon,
            year: item.year
          }))
        : [],
      email: result.email,
      address: result.address,
      phone_number: result.phoneNumber,
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
      created_at: result.createdAt,
      updated_at: result.updatedAt
    }
  }

  public fromCreate(result: any) {
    return {
      user_id: result.userId,
      name: result.name,
      username: result.username,
      avatar: baseUrl + 'public/user/' + result.imageUrl,
      bio: result.bio,
      date_of_birth: Array.isArray(result.dateOfBirth)
        ? result.dateOfBirth.map((item: any) => ({
            date: item.date,
            moon: item.moon,
            year: item.year
          }))
        : [],
      email: result.email,
      address: result.address,
      phone_number: result.phoneNumber,
      updated_at: result.updatedAt
    }
  }

  public fromSearch(result: any) {
    return {
      user_id: result.userId,
      name: result.name,
      username: result.username,
      avatar: baseUrl + 'public/user/' + result.imageUrl,
      email: result.email,
      phone_number: result.phoneNumber,
      created_at: result.createdAt,
      updated_at: result.updatedAt
    }
  }
}
