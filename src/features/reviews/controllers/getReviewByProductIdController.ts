import { Request, Response } from 'express'
import { getReviewByProductIdService } from '../services/getReviewByProductIdService'

export const getReviewByIdController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await getReviewByProductIdService(productId)
    const response = result.map((item) => ({
      review_id: item.reviewId,
      product_id: item.productId,
      rating: item.rating,
      comment: item.comment,
      created_at: item.createdAt,
      user: {
        user_id: item.users.userId,
        name: item.users.name,
        email: item.users.email
      }
    }))
    res.status(200).json({ data: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
