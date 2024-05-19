import { createCartController } from './controllers/createCartController'
import { deleteCartController } from './controllers/deleteCartController'
import { getAllCartController } from './controllers/getAllCartController'
import { getCartByCartIdController } from './controllers/getCartByCartIdController'
import { updateCartController } from './controllers/updateCartController'

export const carts = {
  createCartController,
  getAllCartController,
  getCartByCartIdController,
  updateCartController,
  deleteCartController
}
