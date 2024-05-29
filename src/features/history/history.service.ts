/* eslint-disable  @typescript-eslint/no-explicit-any */
import prisma from '../../libs/prisma'
import * as dto from '../../dto/history/history-dto'

import { ResponseError } from '../../error/response-error'
import { Validation } from '../../utils/validation'
import { HistoryValidation } from '../../validation/history-validation'

export class HistoryService {
  static async create(
    userId: string,
    request: dto.CreateHistoryRequest
  ): Promise<dto.HistoryResponse> {
    const createRequest = Validation.validate(HistoryValidation.CREATE, request)
    const userExist = await prisma.users.findFirst({
      where: {
        userId
      }
    })
    if (!userExist) {
      throw new ResponseError(404, `User with id ${userId} not found`)
    }
    const result = await prisma.history.create({
      data: {
        userId,
        title: createRequest.title,
        category: createRequest.title
      }
    })
    return dto.toHistoryResponse(result)
  }

  static async getById(userId: string): Promise<dto.HistoryResponse[]> {
    const userExist = await prisma.users.findFirst({
      where: {
        userId
      }
    })

    if (!userExist) {
      throw new ResponseError(404, `User with id ${userId} not found`)
    }

    const result = await prisma.history.findMany({
      where: {
        userId
      }
    })

    return result.map(dto.toHistoryResponse)
  }

  static async delete(historyId: string) {
    try {
      await prisma.history.delete({
        where: {
          historyId
        }
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new ResponseError(404, `History with id ${historyId} not found`)
      }
      throw error
    }
  }
}
