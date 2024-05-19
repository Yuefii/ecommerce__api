import { Request, Response } from 'express'
import { deleteReviewService } from '../services/deleteReviewService'

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId
    await deleteReviewService(reviewId)
    res.status(200).json({ message: 'review product deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
