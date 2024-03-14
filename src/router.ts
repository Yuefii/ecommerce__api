import express from 'express';

import { products } from './controllers/products';
import { reviews } from './controllers/reviews';
import { users } from './controllers/users';

export const router = express.Router()

// grouping /v1/users
const usersRouter = express.Router()
router.use('/v1/users', usersRouter)
// users router
usersRouter.post('/register', users.createUserController)
usersRouter.post('/login', users.loginUserController)
usersRouter.get('', users.getAllUsersController)
usersRouter.get('/:userId', users.getUserByUserIdController)
usersRouter.patch('/:userId/update', users.updateUserController)
usersRouter.delete('/:userId/delete', users.deleteUserController)

// grouping /v1/products
const productsRouter = express.Router()
router.use('/v1/products', productsRouter)
// products router
productsRouter.post('', products.createProductController)
productsRouter.get('', products.getAllProductController)
productsRouter.get('/:productId', products.getProductByProductIdController)
productsRouter.patch('/:productId/update', products.updateProductController)
productsRouter.delete('/:productId/delete', products.deleteProductController)
// reviews router
productsRouter.get('/:productId/review', reviews.getReviewByIdController)
productsRouter.post('/:productId/review', reviews.createReviewController)
productsRouter.patch('/review/:reviewId/update', reviews.updateReviewController)
productsRouter.delete('/review/:reviewId/delete', reviews.deleteReviewController)