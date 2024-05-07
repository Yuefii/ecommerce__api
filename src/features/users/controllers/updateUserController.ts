import { Request, Response } from 'express'
import { updateUserService } from '../services/updateUserService'
import { UserDTO } from '../../../dto/UserDto'

export const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params
  const userData = req.body
  try {
    const result = await updateUserService(userId, userData)
    const DTO = new UserDTO()
    const response = DTO.fromCreate(result)
    res.status(201).json({
      message: 'successfully',
      statusCode: 201,
      updated: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
