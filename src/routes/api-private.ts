import express from 'express'

import { Auth } from '../middleware/auth'
import { UserController } from '../features/users/user.controller'
import { ChatController } from '../features/chats/chat.controller'
import { HistoryController } from '../features/history/history.controller'
import { MessageControler } from '../features/chats/message.controller'
import { AddressController } from '../features/users/address.controller'
import { ProductController } from '../features/products/product.controller'

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
privateRouter.patch(
  '/v1/users/:userId/address/:addressId/update',
  AddressController.update
)
privateRouter.delete(
  '/v1/users/:userId/address/:addressId/delete',
  AddressController.delete
)
// history
privateRouter.post('/v1/users/:userId/history', HistoryController.create)
privateRouter.get('/v1/users/:userId/historys', HistoryController.getById)
privateRouter.delete(
  '/v1/users/:historyId/history/delete',
  HistoryController.delete
)
// Chats
privateRouter.post('/v1/chats/room/create', ChatController.create)
privateRouter.get('/v1/chats/:userId/room', ChatController.getAllById)
privateRouter.post(
  '/v1/chats/room/:chatId/sender/:senderId/message',
  MessageControler.create
)
privateRouter.get('/v1/chats/room/:chatId/message', MessageControler.getById)
// Products
privateRouter.post('/v1/products/owner/:ownerId', ProductController.create)
privateRouter.patch(
  '/v1/products/:productId/owner/:ownerId/update',
  ProductController.update
)
privateRouter.patch(
  '/v1/products/:productId/upload-images',
  ProductController.updateImage
)
privateRouter.delete('/v1/products/:productId/delete', ProductController.delete)
