import { createHistoryController } from './controllers/createHistoryController'
import { deleteHistoryController } from './controllers/deleteHistoryController'
import { getHistoryByHistoryIdController } from './controllers/getHistoryByUserIdController'

export const history = {
  createHistoryController,
  getHistoryByHistoryIdController,
  deleteHistoryController
}
