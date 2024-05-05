import { Request, Response } from 'express'
import { deleteDiscusService } from '../services/deleteDiscusService'
import { logger } from '../../../utils/winston'

export const deleteDiscusController = async (req: Request, res: Response) => {
  const { discusId } = req.params

  try {
    logger.info(`Received request to delete discus for discusId : ${discusId}`)

    await deleteDiscusService(discusId)

    logger.info(`Successfully deleted discus for discusId : ${discusId}`)
    res.status(200).json({ message: 'discus deleted successfully' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error deleted discus for discusId : ${discusId}`, {
        error: error.message
      })
      res.status(404).json({
        statusCode: 404,
        error: 'discusId not found'
      })
    } else {
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }
}
