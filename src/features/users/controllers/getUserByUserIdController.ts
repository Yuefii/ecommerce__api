import { Request, Response } from 'express'
import { getUserByUserIdService } from '../services/getUserByUserIdService'
import { UserDetailDTO } from '../../../dto/UserDto'

export const getUserByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId
    const user = await getUserByUserIdService(userId)
    const response = UserDetailDTO(user)
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
