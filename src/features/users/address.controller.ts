import { NextFunction, Request, Response } from 'express'
import { AddressService } from './address.service'
import * as dto from '../../dto/users/address-dto'

export class AddressController {
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params
      const request: dto.addressRequest = req.body as dto.addressRequest
      const response = await AddressService.update(userId, addressId, request)
      res.status(200).json({
        message: 'Successfully',
        updated: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params
      await AddressService.delete(userId, addressId)
      res.status(200).json({
        message: 'Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
