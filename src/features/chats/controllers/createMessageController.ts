import { Request, Response } from 'express'
import { createMessageService } from '../services/createMessageService'

export const createMessageController = async (req: Request, res: Response) => {
  const { senderId, chatId } = req.params
  const { text } = req.body
  try {
    const result = await createMessageService(text, chatId, senderId)
    res.status(201).json({ data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error'
    })
  }
}
