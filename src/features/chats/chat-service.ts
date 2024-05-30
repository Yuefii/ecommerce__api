import prisma from '../../libs/prisma'

import {
  RoomCreateResponse,
  RoomResponse,
  toCreateRoomResponse,
  toRoomResponse
} from '../../dto/chats/chat-dto'
import { ResponseError } from '../../error/response-error'

export class ChatService {
  static async create(participants: string[]): Promise<RoomCreateResponse> {
    if (participants.length < 2) {
      throw new ResponseError(400, 'At least two participants are required')
    }
    const users = await prisma.users.findMany({
      where: {
        userId: {
          in: participants
        }
      }
    })

    if (users.length !== participants.length) {
      throw new ResponseError(404, 'One or more participants do not exist')
    }

    participants.sort()
    const existingChat = await prisma.chat.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: participants[0] } } },
          { participants: { some: { userId: participants[1] } } }
        ]
      },
      include: {
        participants: true
      }
    })

    if (existingChat) {
      return toCreateRoomResponse(existingChat)
    }

    const result = await prisma.chat.create({
      data: {
        participants: {
          connect: participants.map((userId) => ({ userId }))
        }
      },
      include: {
        participants: true
      }
    })
    return toCreateRoomResponse(result)
  }

  static async getAllById(userId: string): Promise<RoomResponse[]> {
    const userExist = await prisma.users.findFirst({
      where: {
        userId
      }
    })

    if (!userExist) {
      throw new ResponseError(404, `User with id ${userId} not found`)
    }
    const result = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        participants: true
      }
    })

    return result.map(toRoomResponse)
  }
}
