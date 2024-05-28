import express from 'express'
import { UserController } from '../features/users/user.controller'
import { Auth } from '../middleware/auth'

export const privateRouter = express.Router()
privateRouter.use(Auth)
// Users
privateRouter.get('/v1/users/:userId', UserController.getById)
privateRouter.put(
  '/v1/users/:userId/change-password',
  UserController.changePassword
)
privateRouter.delete('/v1/users/:userId/delete', UserController.delete)
privateRouter.patch('/v1/users/:userId/update', UserController.update)
privateRouter.put('/v1/users/:userId/upload-image', UserController.uploadImage)
