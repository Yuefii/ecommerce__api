import express from 'express'
import { ChatController } from '../features/chats/chat-controller'

const chatController = new ChatController()
export const chatsRouter = express.Router()

chatsRouter.post(
  '/v1/chats/room/:chatId/sender/:senderId/message',
  chatController.createMessage.bind(chatController)
)
chatsRouter.post(
  '/v1/chats',
  chatController.createRoomChat.bind(chatController)
)
chatsRouter.get(
  '/v1/chats/room/:chatId/message',
  chatController.getMessageByChatId.bind(chatController)
)
chatsRouter.get(
  '/v1/chats/room',
  chatController.getAllRoomChats.bind(chatController)
)
