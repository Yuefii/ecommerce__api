import { Request, Response } from 'express'
import { getAllUsersService } from '../services/getAllUserService'
import { UserDTO } from '../../../dto/UserDto'

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersService()
    const DTO = new UserDTO()
    const response = result.map((item) => DTO.fromGet(item))
    res.status(200).json({
      data: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
