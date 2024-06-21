import { UploadedFile } from 'express-fileupload'
import { ProductService } from './product.service'
import { NextFunction, Request, Response } from 'express'

import * as dto from '../../dto/products/product-dto'
import { UploadedFile } from 'express-fileupload'

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { ownerId } = req.params;
      const files = req.files as unknown as UploadedFile[];
      const body = req.body;
      const price = parseFloat(body.price);

      const request: dto.CreateProductRequest = {
        ownerId,
        name: body.name,
        description: body.description,
        brand: body.brand,
        price,
        category: body.category,
        condition: body.condition
      };

      const response = await ProductService.create(ownerId, request, body, files);
      res.status(201).json({
        message: 'Successfully',
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, ownerId } = req.params
      const request: dto.CreateProductRequest =
        req.body as dto.CreateProductRequest
      const response = await ProductService.update(productId, ownerId, request)
      res.status(200).json({
        message: 'Successfully',
        updated: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params
      const { imgIds } = req.body
      const urls = req.files?.urls as UploadedFile[]
      const response = await ProductService.uploadImages(
        productId,
        imgIds,
        urls
      )
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
      const { productId } = req.params
      await ProductService.delete(productId)
      res.status(200).json({
        message: 'Successfully'
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

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params
      const response = await ProductService.getById(productId)
      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
  static async getBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const keyword: string | undefined = req.query.q?.toString()
      const limit: number = req.query.limit
        ? parseInt(req.query.limit.toString())
        : 10
      if (keyword) {
        const response = await ProductService.getBySearch(keyword, limit)
        res.status(200).json({
          data: response
        })
      } else {
        throw new Error('Invalid keyword provided')
      }
    } catch (error) {
      next(error)
    }
  }
}
