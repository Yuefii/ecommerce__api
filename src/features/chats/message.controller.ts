import { NextFunction, Request, Response } from 'express'
import { MessageService } from './message.service'

export class MessageControler {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { senderId, chatId } = req.params
    const request = req.body
    try {
      const result = await MessageService.create(request, chatId, senderId)
      res.status(201).json({ data: result })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const { chatId } = req.params
    try {
      const result = await MessageService.getMessage(chatId)
      res.status(200).json({ data: result })
    } catch (error) {
      next(error)
    }
  }
}
