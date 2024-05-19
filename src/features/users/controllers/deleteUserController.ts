import { Request, Response } from 'express'
import { deleteUserService } from '../services/deleteUserService'

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    await deleteUserService(userId)
    res.status(200).json({
      message: 'User deleted successfully',
      statusCode: 200
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
