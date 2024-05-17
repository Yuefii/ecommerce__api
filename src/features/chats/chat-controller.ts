import { Request, Response } from 'express'
import { ChatService } from './chat-service'

export class ChatController {
  private chatService: ChatService

  constructor() {
    this.chatService = new ChatService()
  }

  async createMessage(req: Request, res: Response) {
    const { senderId, chatId } = req.params
    const { text } = req.body
    try {
      const result = await this.chatService.createMessage(
        text,
        chatId,
        senderId
      )
      res.status(201).json({ data: result })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }

  async getMessageByChatId(req: Request, res: Response) {
    const { chatId } = req.params
    try {
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
      res.status(200).json({ data: response })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }

  async createRoomChat(req: Request, res: Response) {
    const { participants } = req.body
    try {
      const result = await this.chatService.createRoomChat(participants)
      res.status(201).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }

  async getAllRoomChats(req: Request, res: Response) {
    try {
      const result = await this.chatService.getAllRoomChats()
      const response = result.map((item) => ({
        chat_id: item.chatId,
        participants: item.participants.map((participant) => ({
          user_id: participant.userId,
          name: participant.name,
          email: participant.email
        }))
      }))
      res.status(200).json({ data: response })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }
}
