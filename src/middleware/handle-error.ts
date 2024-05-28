import { logger } from '../libs/winston'
import { ZodError } from 'zod'
import { ResponseError } from '../error/response-error'
import { Response, Request, NextFunction } from 'express'

export const HandleError = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message
    }))

    logger.error(formattedErrors)
    res.status(400).json({
      errors: formattedErrors
    })
    next()
  } else if (error instanceof ResponseError) {
    logger.error(error.message)
    res.status(error.status).json({
      errors: error.message
    })
    next()
  } else {
    logger.error(error.message)
    res.status(500).json({
      errors: 'Internal Server Error'
    })
  }
}
