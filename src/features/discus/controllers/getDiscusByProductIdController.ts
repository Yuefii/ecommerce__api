import { logger } from '../../../utils/winston'
import { DiscusDTO } from '../../../dto/DiscusDto'
import { Request, Response } from 'express'
import { getDiscusByProductIdService } from '../services/getDiscusByProductIdService'

export const getDiscusByProductIdController = async (
  req: Request,
  res: Response
) => {
  const { productId } = req.params

  try {
    logger.info(`Received request to get discus for productId : ${productId}`)

    const result = await getDiscusByProductIdService(productId)
    const DTO = new DiscusDTO()
    const response = result.map((item) => DTO.fromGet(item))

    logger.info(`Successfully get discus for productId : ${productId}`)
    res.status(200).json({ data: response })
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error get discus for productId : ${productId}`, {
        error: error.message
      })
      res.status(404).json({
        statusCode: 404,
        error: 'product not found'
      })
    } else {
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error'
      })
    }
  }
}
