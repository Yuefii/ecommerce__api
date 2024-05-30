import { ChatService } from './chat-service'
import { NextFunction, Request, Response } from 'express'

export class ChatController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { participants } = req.body
    try {
      const response = await ChatService.create(participants)
      res.status(201).json({ data: response })
    } catch (error) {
      next(error)
    }
  }

  static async getAllById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const result = await ChatService.getAllById(userId)
      res.status(200).json({ data: result })
    } catch (error) {
      next(error)
    }
  }
}
