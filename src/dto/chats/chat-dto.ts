import { Chat, Users } from '@prisma/client'

export type RoomCreateResponse = {
  chat_id: string
  participants: {
    user_id1: string
    user_id2: string
  }
  created_at: Date
}

export type RoomResponse = {
  chat_id: string
  participants: Participant[]
  created_at: Date
}

export type Participant = {
  user_id?: string
  name?: string | null
  username?: string | null
  avatar?: string | null
}

export function toRoomResponse(
  chat: Chat & { participants: Users[] }
): RoomResponse {
  return {
    chat_id: chat.chatId,
    participants: chat.participants.map((item) => ({
      user_id: item.userId,
      name: item.name,
      username: item.username,
      avatar: item.imageUrl
    })),
    created_at: chat.createdAt
  }
}
export function toCreateRoomResponse(
  chat: Chat & { participants: Users[] }
): RoomCreateResponse {
  return {
    chat_id: chat.chatId,
    participants: {
      user_id1: chat.participants[0].userId,
      user_id2: chat.participants[1].userId
    },
    created_at: chat.createdAt
  }
}
