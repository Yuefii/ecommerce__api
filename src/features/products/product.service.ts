import path from 'path'
import prisma from '../../libs/prisma'
import * as dto from '../../dto/products/product-dto'

import { bucket } from '../../libs/firebase'
import { Validation } from '../../utils/validation'
import { UploadedFile } from 'express-fileupload'
import { ResponseError } from '../../error/response-error'
import { ProductValidation } from '../../validation/product-validation'

export class ProductService {
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
      throw new ResponseError(404, `User with id ${request.ownerId} not found`)
    }

    const productData: dto.CreateProductRequest = {
      ownerId,
      name: createRequest.name,
      description: createRequest.description,
      brand: createRequest.brand,
      price: createRequest.price,
      category: createRequest.category,
      condition: createRequest.condition
    }

    return await prisma.$transaction(async (prisma) => {
      const imagesData =
        request.images && Array.isArray(request.images)
          ? request.images
          : request.images && request.images.create
            ? request.images.create
            : []
      if (imagesData.length > 0) {
        productData.images = {
          create: imagesData
        }
      }

      const result = await prisma.products.create({
        data: productData,
        include: {
          images: true,
          owner: true,
          review: {
            include: {
              users: true
            }
          },
          discus: {
            include: {
              Users: true,
              discusType: true,
              reply: {
                include: {
                  Users: true
                }
              }
            }
          }
        }
      })

      return dto.toProductResponse(result)
    })
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
      throw new ResponseError(404, `User with id ${request.ownerId} not found`)
    }
    const productData: dto.CreateProductRequest = {
      ownerId,
      name: createRequest.name,
      description: createRequest.description,
      brand: createRequest.brand,
      price: createRequest.price,
      category: createRequest.category,
      condition: createRequest.condition
    }

    return await prisma.$transaction(async (prisma) => {
      const imagesData =
        createRequest.images && Array.isArray(createRequest.images)
          ? createRequest.images
          : []

      for (const img of imagesData) {
        if (img.imgId) {
          await prisma.images.update({
            where: { imgId: img.imgId },
            data: {
              name: img.name,
              quantity: img.quantity
            }
          })
        }
      }

      const newImages = imagesData
        .filter((img) => !img.imgId)
        .map((img) => ({
          name: img.name,
          quantity: img.quantity
        }))

      if (newImages.length > 0) {
        productData.images = {
          create: newImages
        }
      }

      const result = await prisma.products.update({
        where: {
          productId
        },
        data: productData,
        include: {
          images: true,
          owner: true,
          review: {
            include: {
              users: true
            }
          },
          discus: {
            include: {
              Users: true,
              discusType: true,
              reply: {
                include: {
                  Users: true
                }
              }
            }
          }
        }
      })
      return dto.toProductResponse(result)
    })
  }

  static async uploadImages(
    productId: string,
    imgIds: string[],
    urls: UploadedFile[]
  ) {
    const existingProduct = await prisma.products.findFirst({
      where: {
        productId
      }
    })
    if (!existingProduct) {
      throw new ResponseError(404, `Product with id ${productId} not found`)
    }

    if (!urls || urls.length === 0) {
      throw new ResponseError(400, 'No files uploaded')
    }

    const publicUrls: any = []

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      const imgId = imgIds[i]

      const fileExtension = path.extname(url.name)
      const fileName = `${imgId}${fileExtension}`
      const blob = bucket.file(`profile_photos/${fileName}`)
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: url.mimetype
        }
      })

      const existingImg = await prisma.images.findUnique({
        where: {
          imgId
        }
      })
      if (!existingImg) {
        throw new ResponseError(404, `Image with id ${imgId} not found`)
      }

      await new Promise((resolve, reject) => {
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
            await prisma.images.update({
              where: { imgId },
              data: {
                url: publicUrl[0]
              }
            })
            publicUrls.push(publicUrl[0])
            resolve(publicUrl[0])
          } catch (error: any) {
            if (error.code === 'P2025') {
              reject(new ResponseError(404, `Image with id ${imgId} not found`))
            } else {
              reject(
                new ResponseError(
                  400,
                  'Failed to get public URL or update image.'
                )
              )
            }
          }
        })
        blobStream.end(url.data)
      })
    }

    return publicUrls
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
        owner: true,
        review: {
          include: {
            users: true
          }
        },
        discus: {
          include: {
            Users: true,
            discusType: true,
            reply: {
              include: {
                Users: true
              }
            }
          }
        }
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
        owner: true,
        review: {
          include: {
            users: true
          }
        },
        discus: {
          include: {
            Users: true,
            discusType: true,
            reply: {
              include: {
                Users: true
              }
            }
          }
        }
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
        owner: true,
        review: {
          include: {
            users: true
          }
        },
        discus: {
          include: {
            Users: true,
            discusType: true,
            reply: {
              include: {
                Users: true
              }
            }
          }
        }
      },
      take: limit
    })
    return result.map(dto.toProductResponse)
  }
}
