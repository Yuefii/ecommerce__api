import { Request, Response } from 'express'
import { getMessageByChatIdService } from '../services/getMessageByChatIdService'

export const getMessageByChatIdController = async (
  req: Request,
  res: Response
) => {
  const { chatId } = req.params
  try {
    const result = await getMessageByChatIdService(chatId)
    const response = result.map((item) => ({
      chat_id: item.chatId,
      message_id: item.messageId,
      user: {
        name: item.sender?.nama,
        email: item.sender?.email
      },
      message: item.text,
      created_at: item.createdAt
    }))
    res.status(201).json({ data: response })
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error'
    })
  }
}
