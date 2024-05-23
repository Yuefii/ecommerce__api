import express from 'express'
import { UserController } from '../features/users/user.controller'
import {
  validateUserLogin,
  validateUserRegister
} from '../validation/userValidation'

const userController = new UserController()
export const userRouter = express.Router()

userRouter.post(
  '/v1/users/register',
  validateUserRegister,
  userController.createUser.bind(userController)
)
userRouter.post(
  '/v1/users/login',
  validateUserLogin,
  userController.loginUser.bind(userController)
)
userRouter.get('/v1/users', userController.getAllUser.bind(userController))
userRouter.get(
  '/v1/users/:userId',
  userController.getUserById.bind(userController)
)
userRouter.get(
  '/v1/users/search',
  userController.getUserBySearch.bind(userController)
)
userRouter.patch(
  '/v1/users/:userId/update',
  userController.updateUser.bind(userController)
)
userRouter.put(
  '/v1/users/:userId/change-password',
  userController.changePasswordUser.bind(userController)
)
userRouter.put(
  '/v1/users/:userId/upload-image',
  userController.uploadImageUser.bind(userController)
)
userRouter.delete(
  '/v1/users/:userId/delete',
  userController.deleteUser.bind(userController)
)
