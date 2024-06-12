import { NextFunction, Request, Response } from 'express'
import { ProductService } from './product.service'

import * as dto from '../../dto/products/product-dto'

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { ownerId } = req.params
      const request: dto.CreateProductRequest =
        req.body as dto.CreateProductRequest
      const response = await ProductService.create(ownerId, request)
      res.status(201).json({
        message: 'Successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ProductService.getAll()
      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
}

