import path from 'path'
import prisma from '../../libs/prisma'
import * as dto from '../../dto/products/product-dto'

import { bucket } from '../../libs/firebase'
import { Validation } from '../../utils/validation'
import { UploadedFile } from 'express-fileupload'
import { ResponseError } from '../../error/response-error'
import { ProductValidation } from '../../validation/product-validation'

export class ProductService {
  static async uploadProductImages(
    imageFiles: UploadedFile[]
  ): Promise<string[]> {
    if (!imageFiles || imageFiles.length === 0) {
      throw new ResponseError(400, 'No files uploaded')
    }

    const uploadPromises = imageFiles.map(async (imageFile) => {
      const fileExtension = path.extname(imageFile.name)
      const fileName = `${Date.now()}${fileExtension}`
      const blob = bucket.file(`product_images/${fileName}`)
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: imageFile.mimetype
        }
      })

      return new Promise<string>((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Blob stream error:', err)
          reject(new ResponseError(400, 'Failed to upload image'))
        })

        blobStream.on('finish', async () => {
          try {
            const publicUrl = await blob.getSignedUrl({
              action: 'read',
              expires: '03-01-2050'
            })
            resolve(publicUrl[0])
          } catch (error) {
            reject(new ResponseError(400, 'Failed to get public URL.'))
          }
        })

        blobStream.end(imageFile.data)
      })
    })

    return Promise.all(uploadPromises)
  }

  static async create(
    ownerId: string,
    request: dto.CreateProductRequest
  ): Promise<dto.ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.CREATE, request)
    const userExist = await prisma.users.findFirst({
      where: {
        userId: ownerId
      }
    })
    if (!userExist) {
      throw new ResponseError(404, `User with id ${ownerId} not found`)
    }
    let imgUrl: string[] = []
    if (request.images && request.images.length > 0) {
      imgUrl = await this.uploadProductImages(request.images)
    }
    const result = await prisma.products.create({
      data: {
        ownerId,
        name: createRequest.name,
        description: createRequest.description,
        brand: createRequest.brand,
        price: createRequest.price,
        category: createRequest.category,
        images: {
          createMany: {
            data: imgUrl.map((url) => ({
              url,
              name: '',
              quantity: 0
            }))
          }
        }
      },
      include: {
        images: true,
        owner: true
      }
    })
    return dto.toProductResponse(result)
  }

  static async update(
    productId: string,
    ownerId: string,
    request: dto.CreateProductRequest
  ): Promise<dto.ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.UPDATE, request)
    const userExist = await prisma.users.findFirst({
      where: {
        userId: ownerId
      }
    })
    if (!userExist) {
      throw new ResponseError(404, `User with id ${ownerId} not found`)
    }
    const result = await prisma.products.update({
      where: {
        productId
      },
      data: {
        ownerId,
        name: createRequest.name,
        description: createRequest.description,
        brand: createRequest.brand,
        price: createRequest.price,
        category: createRequest.category
      },
      include: {
        images: true,
        owner: true
      }
    })
    return dto.toProductResponse(result)
  }

  static async updateImage(
    productId: string,
    imgId: string,
    request: dto.ProductImagesRequest
  ): Promise<dto.ProductImagesResponse> {
    const createRequest = Validation.validate(ProductValidation.IMAGE, request)
    const existingProduct = await prisma.products.findFirst({
      where: {
        productId
      }
    })
    if (!existingProduct) {
      throw new ResponseError(404, `User with id ${productId} not found`)
    }
    const existingImg = await prisma.images.findUnique({
      where: {
        imgId
      }
    })
    if (!existingImg) {
      throw new ResponseError(404, `User with id ${imgId} not found`)
    }
    let updatedImg = existingImg.url ? [existingImg.url] : []

    if (request.url) {
      const updatedUrls = Array.isArray(request.url)
        ? request.url
        : [request.url]
      updatedImg = await this.uploadProductImages(updatedUrls)
    }

    const quantity = createRequest.quantity ?? 0
    const updatedQuantity = (existingImg.quantity ?? 0) + quantity

    const result = await prisma.images.update({
      where: {
        imgId
      },
      data: {
        productId,
        name: createRequest.name,
        quantity: updatedQuantity,
        url: updatedImg.join(',')
      }
    })
    return dto.toProductImagesResponse(result)
  }

  static async delete(productId: string) {
    const productExist = await prisma.products.findFirst({
      where: {
        productId
      }
    })
    if (!productExist) {
      throw new ResponseError(404, `Product with id ${productId} not found`)
    }
    await prisma.products.delete({
      where: {
        productId
      }
    })
  }

  static async getAll(): Promise<dto.ProductResponse[]> {
    const result = await prisma.products.findMany({
      include: {
        images: true,
        owner: true
      }
    })
    return result.map(dto.toProductResponse)
  }

  static async getById(productId: string): Promise<dto.ProductResponse | null> {
    const result = await prisma.products.findUnique({
      where: {
        productId
      },
      include: {
        images: true,
        owner: true
      }
    })
    if (!result) {
      return null
    }
    return dto.toProductResponse(result)
  }

  static async getBySearch(
    keyword: string,
    limit: number
  ): Promise<dto.ProductResponse[]> {
    const result = await prisma.products.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keyword,
              mode: 'insensitive'
            },
            description: {
              contains: keyword,
              mode: 'insensitive'
            },
            brand: {
              contains: keyword,
              mode: 'insensitive'
            },
            category: {
              contains: keyword,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        images: true,
        owner: true
      },
      take: limit
    })
    return result.map(dto.toProductResponse)
  }
}
