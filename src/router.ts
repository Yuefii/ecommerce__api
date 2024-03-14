import express from 'express';

import {
    createUserController,
    deleteUserController,
    getUserByIdController,
    getUsersController,
    loginUserController,
    updateUserController
} from './controllers/users.controller'

import {
    createProductController,
    deleteProductController,
    getProductByIdController,
    getProductController,
    updateProductController
} from './controllers/products.controller'
import { 
    createReviewController, 
    deleteReviewController, 
    getReviewByIdController, 
    updateReviewController 
} from './controllers/reviews.controllers';

export const router = express.Router()

// grouping /v1/users
const usersRouter = express.Router()
router.use('/v1/users', usersRouter)
// users router
usersRouter.post('/register', createUserController)
usersRouter.post('/login', loginUserController)
usersRouter.get('', getUsersController)
usersRouter.get('/:userId', getUserByIdController)
usersRouter.patch('/:userId/update', updateUserController)
usersRouter.delete('/:userId/delete', deleteUserController)

// grouping /v1/products
const productsRouter = express.Router()
router.use('/v1/products', productsRouter)
// products router
productsRouter.post('', createProductController)
productsRouter.post('/:productId/review', createReviewController)
productsRouter.get('', getProductController)
productsRouter.get('/:productId', getProductByIdController)
productsRouter.get('/:productId/review', getReviewByIdController)
productsRouter.patch('/:productId/update', updateProductController)
productsRouter.patch('/review/:reviewId/update', updateReviewController)
productsRouter.delete('/:productId/delete', deleteProductController)
productsRouter.delete('/review/:reviewId/delete', deleteReviewController)