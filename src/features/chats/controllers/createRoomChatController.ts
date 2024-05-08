import { Request, Response } from 'express'
import { createRoomChatService } from '../services/createRoomChatService'

export const createRoomChatController = async (req: Request, res: Response) => {
  const { participants } = req.body
  try {
    const result = await createRoomChatService(participants)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error'
    })
  }
}
