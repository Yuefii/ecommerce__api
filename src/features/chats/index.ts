import { createMessageController } from './controllers/createMessageController'
import { createRoomChatController } from './controllers/createRoomChatController'
import { getAllRoomChatController } from './controllers/getAllRoomChatController'
import { getMessageByChatIdController } from './controllers/getMessageByChatIdController'

export const chat = {
  createRoomChatController,
  createMessageController,
  getAllRoomChatController,
  getMessageByChatIdController
}
