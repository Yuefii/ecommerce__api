import { Request, Response } from 'express'
import { createReviewService } from '../services/createReviewService'

export const createReviewController = async (req: Request, res: Response) => {
  const { productId } = req.params
  const reviewData = req.body

  try {
    const result = await createReviewService(productId, reviewData)
    const response = {
      review_id: result.reviewId,
      product_id: result.productId,
      rating: result.rating,
      comment: result.comment,
      created_at: result.createdAt,
      user: {
        user_id: result.users.userId,
        name: result.users.name,
        email: result.users.email
      }
    }
    res.json({
      message: 'successfully',
      data: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
