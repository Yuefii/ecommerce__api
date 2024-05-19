import { logger } from '../../utils/winston'
import { ChatService } from './chat-service'
import { Request, Response } from 'express'

export class ChatController {
  private chatService: ChatService

  constructor() {
    this.chatService = new ChatService()
  }

  async createMessage(req: Request, res: Response) {
    const { senderId, chatId } = req.params
    const { text } = req.body
    try {
      logger.info(
        `Received request to create Message for senderId : ${senderId} & chatId : ${chatId}`
      )
      const result = await this.chatService.createMessage(
        text,
        chatId,
        senderId
      )
      logger.info(
        `Successfully created Message for senderId : ${senderId} & chatId : ${chatId}`
      )
      res.status(201).json({ data: result })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          `Error creating history for Message for senderId : ${senderId} & chatId : ${chatId}`,
          {
            error: error.message
          }
        )
        res.status(404).json({
          statusCode: 404,
          error: 'senderId & chatId not found'
        })
      } else {
        res.status(500).json({
          statusCode: 500,
          error: 'Internal Server Error'
        })
      }
    }
  }

  async getMessageByChatId(req: Request, res: Response) {
    const { chatId } = req.params
    try {
      logger.info(`Received request to get message for chatId : ${chatId}`)
      const result = await this.chatService.getMessageByChatId(chatId)
      const response = result.map((item) => ({
        chat_id: item.chatId,
        message_id: item.messageId,
        user: {
          name: item.sender?.name,
          email: item.sender?.email
        },
        message: item.text,
        created_at: item.createdAt
      }))
      logger.info(`Successfully get message for chatId : ${chatId}`)
      res.status(200).json({ data: response })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error get message for chatId : ${chatId}`, {
          error: error.message
        })
        res.status(404).json({
          statusCode: 404,
          error: 'chatId not found'
        })
      } else {
        res.status(500).json({
          statusCode: 500,
          error: 'Internal Server Error'
        })
      }
    }
  }

  async createRoomChat(req: Request, res: Response) {
    const { participants } = req.body
    try {
      logger.info(`Received request to create room for chat ${participants}`)
      const result = await this.chatService.createRoomChat(participants)
      logger.info(`Successfully created room for chat ${participants}`)
      res.status(201).json({ data: result })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error creating room for chat ${participants}`, {
          error: error.message
        })
        res.status(404).json({
          statusCode: 404,
          error: 'praticipants not found'
        })
      } else {
        res.status(500).json({
          statusCode: 500,
          error: 'Internal Server Error'
        })
      }
    }
  }

  async getAllRoomChats(req: Request, res: Response) {
    try {
      logger.info(`Received request to get all room chats`)
      const result = await this.chatService.getAllRoomChats()
      const response = result.map((item) => ({
        chat_id: item.chatId,
        participants: item.participants.map((participant) => ({
          user_id: participant.userId,
          name: participant.name,
          email: participant.email
        }))
      }))
      logger.info(`Successfully get all room chats`)
      res.status(200).json({ data: response })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error get all room chats`, {
          error: error.message
        })
        res.status(404).json({
          statusCode: 404,
          error: 'room chats not found'
        })
      } else {
        res.status(500).json({
          statusCode: 500,
          error: 'Internal Server Error'
        })
      }
    }
  }
}
