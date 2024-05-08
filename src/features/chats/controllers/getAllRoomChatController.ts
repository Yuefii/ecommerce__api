import { Request, Response } from 'express'
import { getAllRoomChatService } from '../services/getAllRoomChatService'

export const getAllRoomChatController = async (req: Request, res: Response) => {
  try {
    const result = await getAllRoomChatService()
    const response = result.map((item) => ({
      chat_id: item.chatId,
      participants: item.participants.map((item) => ({
        user_id: item.userId,
        name: item.nama,
        email: item.email
      }))
    }))
    res.status(200).json({ data: response })
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error'
    })
  }
}
