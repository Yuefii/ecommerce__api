import prisma from '../../libs/prisma'
import * as dto from '../../dto/chats/message-dto'
import { Validation } from '../../utils/validation'
import { MessageValidation } from '../../validation/message-validation'
import { ResponseError } from '../../error/response-error'

export class MessageService {
  static async create(
    request: dto.MessageRequest,
    chatId: string,
    senderId: string
  ): Promise<dto.CreateMessageResponse> {
    const CreateMessageRequest = Validation.validate(
      MessageValidation.CREATE,
      request
    )
    const chatIdExist = await prisma.messages.findFirst({
      where: {
        chatId: chatId
      }
    })
    const userIdExist = await prisma.users.findFirst({
      where: {
        userId: senderId
      }
    })
    if (!chatIdExist || !userIdExist) {
      throw new ResponseError(
        404,
        `Chat with id ${chatId} & sender with id ${senderId} not found`
      )
    }
    const result = await prisma.messages.create({
      data: {
        text: CreateMessageRequest.text,
        chatId,
        senderId
      },
      include: {
        sender: true
      }
    })
    return dto.toCreateMessageResponse(result)
  }

  static async getMessage(
    chatId: string
  ): Promise<dto.CreateMessageResponse[]> {
    const chatIdExist = await prisma.messages.findFirst({
      where: {
        chatId: chatId
      }
    })
    if (!chatIdExist) {
      throw new ResponseError(404, `Chat with id ${chatId} not found`)
    }
    const result = await prisma.messages.findMany({
      where: {
        chatId
      },
      include: {
        sender: true
      }
    })
    return result.map(dto.toCreateMessageResponse)
  }
}
