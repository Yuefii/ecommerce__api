import { UserDTO } from '../../../dto/UserDto'
import { ResponseError } from '../../../error/responseError'
import { Request, Response } from 'express'
import { createUserService } from '../services/createUserService'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await createUserService(userData)
    const DTO = new UserDTO()
    const response = DTO.fromCreate(result)
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
