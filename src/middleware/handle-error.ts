import { ZodError } from 'zod'
import { ResponseError } from '../error/response-error'
import { Response, Request } from 'express'
import { logger } from '../libs/winston'

export const HandleError = async (
  error: Error,
  req: Request,
  res: Response
) => {
  if (error instanceof ZodError) {
    logger.error(error.message)
    res.status(400).json({
      errors: `Validation Error : ${JSON.stringify(error)}`
    })
  } else if (error instanceof ResponseError) {
    logger.error(error.message)
    res.status(error.status).json({
      errors: error.message
    })
  } else {
    logger.error(error.message)
    res.status(500).json({
      errors: error.message
    })
  }
}
