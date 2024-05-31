import express from 'express'
import { products } from './features/products'
import { reviews } from './features/reviews'
import { carts } from './features/carts'
import { orders } from './features/orders'
import { discus } from './features/discus'

export const router = express.Router()

// grouping /v1/products
const productsRouter = express.Router()
router.use('/v1/products', productsRouter)
// products router
productsRouter.post('', products.createProductController)
productsRouter.get('', products.getAllProductController)
productsRouter.get('/search', products.getProductBySearchController)
productsRouter.get('/:productId', products.getProductByProductIdController)
productsRouter.patch(
  '/:productId/owner/:userId/update',
  products.updateProductController
)
productsRouter.delete('/:productId/delete', products.deleteProductController)
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

// grouping /v1/carts
const cartsRouter = express.Router()
router.use('/v1/carts', cartsRouter)
// carts router
cartsRouter.post('', carts.createCartController)
cartsRouter.get('', carts.getAllCartController)
cartsRouter.get('/:cartId', carts.getCartByCartIdController)
cartsRouter.patch('/:cartId/update', carts.updateCartController)
cartsRouter.delete('/:cartId/delete', carts.deleteCartController)

// grouping /v1/orders
const ordersRouter = express.Router()
router.use('/v1/orders', ordersRouter)
// orders router
ordersRouter.post('', orders.createOrderController)
ordersRouter.get('', orders.getAllOrderController)
ordersRouter.get('/:orderId', orders.getOrderByOrderIdController)
ordersRouter.patch('/:orderId/update', orders.updateOrderController)
ordersRouter.delete('/:orderId/delete', orders.deleteOrderController)
