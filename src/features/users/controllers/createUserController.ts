import { Request, Response } from 'express'
import { createUserService } from '../services/createUserService'
import { UserDTO } from '../../../dto/UserDto'
import { ResponseError } from '../../../error/responseError'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const user = await createUserService(userData)
    const response = UserDTO(user)
    res.status(201).json({
      message: 'successfully',
      statusCode: 201,
      data: response
    })
  } catch (error) {
    console.error(error)
    if (error instanceof ResponseError) {
      res.status(error.statusCode).json({
        statusCode: error.statusCode,
        error: error.message
      })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
