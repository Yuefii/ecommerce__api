import prisma from '../../libs/prisma'
import * as dto from '../../dto/users/address-dto'

import { Validation } from '../../utils/validation'
import { ResponseError } from '../../error/response-error'
import { AddressValidation } from '../../validation/address-validation'

export class AddressService {
  static async update(
    userId: string,
    addressId: string,
    request: dto.addressRequest
  ): Promise<dto.addressResponse> {
    const createRequest = Validation.validate(AddressValidation.UPDATE, request)
    const addressExist = await prisma.address.findFirst({
      where: {
        AND: [{ userId: userId }, { id: addressId }]
      }
    })

    if (!addressExist) {
      throw new ResponseError(
        404,
        `User with id ${userId} & address with id ${addressId} not found`
      )
    }

    const result = await prisma.address.update({
      where: {
        id: addressId
      },
      data: createRequest
    })

    return dto.toAddressResponse(result)
  }

  static async delete(userId: string, addressId: string) {
    const addressExist = await prisma.address.findFirst({
      where: {
        AND: [{ userId: userId }, { id: addressId }]
      }
    })

    if (!addressExist) {
      throw new ResponseError(
        404,
        `User with id ${userId} & address with id ${addressId} not found`
      )
    }
    await prisma.address.delete({
      where: {
        id: addressId
      }
    })
  }
}
