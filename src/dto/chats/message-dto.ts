import { Messages, Users } from '@prisma/client'

export type CreateMessageResponse = {
  chat_id: string | null
  message: {
    message_id: string
    content: string
  }
  sender?: {
    sender_id?: string | null
    name?: string | null
    username?: string | null
    avatar?: string | null
  }
  created_at: Date
}

export type MessageRequest = {
  text: string
}

export function toCreateMessageResponse(
  message: Messages & { sender: Users | null }
): CreateMessageResponse {
  return {
    chat_id: message.chatId,
    message: {
      message_id: message.messageId,
      content: message.text
    },
    sender: message.sender
      ? {
          sender_id: message.sender.userId,
          name: message.sender.name,
          username: message.sender.username,
          avatar: message.sender.imageUrl
        }
      : undefined,
    created_at: message.createdAt
  }
}
