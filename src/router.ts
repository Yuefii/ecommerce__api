import express from 'express'
import { reviews } from './features/reviews'
import { discus } from './features/discus'

export const router = express.Router()

// grouping /v1/products
const productsRouter = express.Router()
router.use('/v1/products', productsRouter)
// products router
// productsRouter.get('', products.getAllProductController)
// productsRouter.get('/search', products.getProductBySearchController)
// productsRouter.get('/:productId', products.getProductByProductIdController)
// productsRouter.patch(
//   '/:productId/owner/:userId/update',
//   products.updateProductController
// )
// productsRouter.delete('/:productId/delete', products.deleteProductController)
// reviews router
productsRouter.get('/:productId/review', reviews.getReviewByIdController)
productsRouter.post('/:productId/review', reviews.createReviewController)
productsRouter.patch('/review/:reviewId/update', reviews.updateReviewController)
productsRouter.delete(
  '/review/:reviewId/delete',
  reviews.deleteReviewController
)
// discus router
productsRouter.get('/:productId/discus', discus.getDiscusByProductIdController)
productsRouter.post('/:productId/discus/:userId', discus.createDiscusController)
productsRouter.post(
  '/:discusId/discus/:userId/reply',
  discus.createReplyDiscusController
)
productsRouter.delete('/discus/:discusId/delete', discus.deleteDiscusController)
