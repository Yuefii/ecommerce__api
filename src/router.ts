import express from 'express'
import { users } from './features/users'
import { products } from './features/products'
import { reviews } from './features/reviews'
import { carts } from './features/carts'
import { orders } from './features/orders'
import { UserImageUrl } from './utils/imageUrl'
import {
  validateUserLogin,
  validateUserRegister,
  validateUserUpdate
} from './validation/userValidation'
import { history } from './features/history'
import { discus } from './features/discus'
import { chat } from './features/chats'

export const router = express.Router()

// grouping img url /public/
const publicRouter = express.Router()
router.use('/public', publicRouter)
publicRouter.get('/public/user/:imageName', UserImageUrl)

// grouping /v1/users
const usersRouter = express.Router()
router.use('/v1/users', usersRouter)
// users router
usersRouter.post('/register', validateUserRegister, users.createUserController)
usersRouter.post('/login', validateUserLogin, users.loginUserController)
usersRouter.get('', users.getAllUsersController)
usersRouter.get('/search', users.getUserBySearchController)
usersRouter.get('/:userId', users.getUserByUserIdController)
usersRouter.patch(
  '/:userId/update',
  validateUserUpdate,
  users.updateUserController
)
usersRouter.put('/:userId/change-password', users.changePasswordController)
usersRouter.put('/:userId/upload-image', users.uploadImageUserController)
usersRouter.delete('/:userId/delete', users.deleteUserController)
// history router
usersRouter.post('/:userId/history', history.createHistoryController)
usersRouter.get('/:userId/historys', history.getHistoryByHistoryIdController)
usersRouter.delete(
  '/:historyId/history/delete',
  history.deleteHistoryController
)

// grouping /v1/chats
const chatRouter = express.Router()
router.use('/v1/chats', chatRouter)
// chat router
chatRouter.post('', chat.createRoomChatController)
chatRouter.post(
  '/room/:chatId/sender/:senderId/message',
  chat.createMessageController
)
chatRouter.get('/room/:chatId/message', chat.getMessageByChatIdController)
chatRouter.get('/room', chat.getAllRoomChatController)

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
