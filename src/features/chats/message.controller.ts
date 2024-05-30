import { NextFunction, Request, Response } from 'express'
import { MessageService } from './message.service'

export class MessageControler {
  static async createMessage(req: Request, res: Response, next: NextFunction) {
    const { senderId, chatId } = req.params
    const { text } = req.body
    try {
      const result = await MessageService.createMessage(text, chatId, senderId)
      res.status(201).json({ data: result })
    } catch (error) {
      next(error)
    }
  }

  static async getMessageByChatId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { chatId } = req.params
    try {
      const result = await MessageService.getMessageByChatId(chatId)
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
      next(error)
    }
  }
}
