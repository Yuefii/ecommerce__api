import { logger } from '../../../utils/winston'
import { DiscusDTO } from '../../../dto/DiscusDto'
import { Request, Response } from 'express'
import { createReplyDiscusService } from '../services/createReplyDiscusService'

export const createReplyDiscusController = async (
  req: Request,
  res: Response
) => {
  const replyData = req.body
  const { discusId, userId } = req.params

  try {
    logger.info(
      `Received request to create discus reply for discusId : ${discusId} & userId : ${userId}`
    )

    const result = await createReplyDiscusService(discusId, userId, replyData)
    const DTO = new DiscusDTO()
    const response = DTO.fromReply(result)

    logger.info(
      `Successfully created discus reply for discusId : ${discusId} & userId : ${userId}`
    )
    res.json({
      message: 'successfully',
      data: response
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(
        `Error creating discus reply for discusId : ${discusId} & userId : ${userId}`,
        { error: error.message }
      )
      res.status(404).json({
        statusCode: 404,
        error: 'discusId & userId not found'
      })
    } else {
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }
}
