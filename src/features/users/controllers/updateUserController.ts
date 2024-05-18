import { Request, Response } from 'express'
import { updateUserService } from '../services/updateUserService'
import { UserDTO } from '../../../dto/user-dto'
import { ResponseError } from '../../../error/responseError'

export const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params
  const userData = req.body
  try {
    const result = await updateUserService(userId, userData)
    const DTO = new UserDTO()
    const response = DTO.fromCreate(result)
    res.status(200).json({
      message: 'successfully',
      statusCode: 200,
      updated: response
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
