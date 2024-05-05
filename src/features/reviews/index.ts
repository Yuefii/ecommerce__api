import { createReviewController } from './controllers/createReviewController'
import { deleteReviewController } from './controllers/deleteReviewController'
import { getReviewByIdController } from './controllers/getReviewByProductIdController'
import { updateReviewController } from './controllers/updateReviewController'

export const reviews = {
  getReviewByIdController,
  createReviewController,
  updateReviewController,
  deleteReviewController
}
