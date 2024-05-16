import { UserDTO } from '../../../dto/user-dto'
import { Request, Response } from 'express'
import { getUserByUserIdService } from '../services/getUserByUserIdService'

export const getUserByUserIdController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params
  try {
    const result = await getUserByUserIdService(userId)
    const DTO = new UserDTO()
    const response = DTO.fromGet(result)

    res.status(200).json({ data: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
