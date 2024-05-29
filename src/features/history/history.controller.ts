import { NextFunction, Request, Response } from 'express'
import * as dto from '../../dto/history/history-dto'
import { HistoryService } from './history.service'

export class HistoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const request: dto.CreateHistoryRequest =
        req.body as dto.CreateHistoryRequest
      const response = await HistoryService.create(userId, request)
      res.status(201).json({
        message: 'Successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const response = await HistoryService.getById(userId)
      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { historyId } = req.params
      await HistoryService.delete(historyId)
      res.status(200).json({
        message: 'Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
