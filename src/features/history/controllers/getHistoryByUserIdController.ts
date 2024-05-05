import { logger } from '../../../utils/winston'
import { Request, Response } from 'express'
import { getHistoryByUserIdService } from '../services/getHistoryByUserIdService'
import { HistoryDTO } from '../../../dto/HistoryDto'

export const getHistoryByHistoryIdController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params

  try {
    logger.info(`Received request to get history for userId : ${userId}`)

    const result = await getHistoryByUserIdService(userId)
    const response = result.map(HistoryDTO)

    logger.info(`Successfully get history for userId : ${userId}`)

    res.status(200).json({ data: response })
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error creating history for userId : ${userId}`, {
        error: error.message
      })
      res.status(404).json({
        statusCode: 404,
        error: 'userId not found'
      })
    } else {
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }
}
