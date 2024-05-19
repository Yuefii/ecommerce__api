import { createDiscusController } from './controllers/createDiscusController'
import { createReplyDiscusController } from './controllers/createReplyDiscusController'
import { deleteDiscusController } from './controllers/deleteDiscusController'
import { getDiscusByProductIdController } from './controllers/getDiscusByProductIdController'

export const discus = {
  createDiscusController,
  createReplyDiscusController,
  getDiscusByProductIdController,
  deleteDiscusController
}
