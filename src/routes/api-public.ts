import express from 'express'
import { UserController } from '../features/users/user.controller'
import { ProductController } from '../features/products/product.controller'

export const publicRouter = express.Router()

publicRouter.post('/v1/users/register', UserController.create)
publicRouter.post('/v1/users/login', UserController.login)
publicRouter.get('/v1/products', ProductController.getAll)
publicRouter.get('/v1/products/:productId', ProductController.getById)
