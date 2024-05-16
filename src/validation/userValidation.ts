import { ZodError } from 'zod'
import { parseZodError } from '../error/zodError'
import { Request, Response, NextFunction } from 'express'
import { userLoginSchema, userRegisterSchema } from './schema/userShema'

export const validateUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userRegisterSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error(error)
      const errorMessage = parseZodError(error.errors)
      res.status(400).json({ error: errorMessage })
    } else {
      next(error)
    }
  }
}
export const validateUserLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userLoginSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error(error)
      const errorMessage = parseZodError(error.errors)
      res.status(400).json({ error: errorMessage })
    } else {
      next(error)
    }
  }
}
