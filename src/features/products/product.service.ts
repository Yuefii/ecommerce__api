import path from 'path'
import prisma from '../../libs/prisma'
import * as dto from '../../dto/products/product-dto'

import { v4 as uuidv4 } from 'uuid';
import { bucket } from '../../libs/firebase'
import { Validation } from '../../utils/validation'
import { UploadedFile } from 'express-fileupload'
import { ResponseError } from '../../error/response-error'
import { ProductValidation } from '../../validation/product-validation'

export class ProductService {
  static async uploadBase64Images(base64Images: string[]): Promise<string[]> {
    if (!base64Images || base64Images.length === 0) {
      throw new ResponseError(400, 'No base64 images provided');
    }

    const uploadPromises = base64Images.map(async (base64Image) => {
      const fileName = `${uuidv4()}.png`; // Ubah ekstensi sesuai dengan jenis gambar yang diharapkan
      const base64Data = base64Image.replace(/^data:image\/png;base64,/, ''); // Ganti sesuai dengan jenis gambar yang diharapkan
      const fileBuffer = Buffer.from(base64Data, 'base64');

      const blob = bucket.file(`product_images/${fileName}`);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: 'image/png', // Ganti sesuai dengan jenis gambar yang diharapkan
        },
      });

      return new Promise<string>((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Blob stream error:', err);
          reject(new ResponseError(400, 'Failed to upload image'));
        });

        blobStream.on('finish', async () => {
          try {
            const publicUrl = await blob.getSignedUrl({
              action: 'read',
              expires: '03-01-2050',
            });
            resolve(publicUrl[0]);
          } catch (error) {
            reject(new ResponseError(400, 'Failed to get public URL.'));
          }
        });

        blobStream.end(fileBuffer);
      });
    });

    return Promise.all(uploadPromises);
  }

  static async create(
    ownerId: string,
    request: dto.CreateProductRequest
  ): Promise<dto.ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.CREATE, request);
    const userExist = await prisma.users.findFirst({
      where: {
        userId: ownerId,
      },
    });
    if (!userExist) {
      throw new ResponseError(404, `User with id ${ownerId} not found`);
    }
  
    let imgUrl: string[] = [];
    let imageDetails: { name: string; quantity: number }[] = [];
  
    if (request.images && request.images.length > 0) {
      const base64Images: string[] = [];
  
      request.images.forEach((imageRequest) => {
        base64Images.push(imageRequest.base64Data); // Ambil base64Data dari input
        imageDetails.push({
          name: imageRequest.name || '',
          quantity: imageRequest.quantity || 0,
        });
      });
  
      if (base64Images.length > 0) {
        imgUrl = await this.uploadBase64Images(base64Images);
      }
    }
  
    const result = await prisma.products.create({
      data: {
        ownerId,
        name: createRequest.name,
        description: createRequest.description,
        brand: createRequest.brand,
        price: createRequest.price,
        category: createRequest.category,
        condition: createRequest.condition,
        images: {
          createMany: {
            data: imgUrl.map((url, index) => ({
              url,
              name: imageDetails[index].name || '',
              quantity: imageDetails[index].quantity || 0,
            })),
          },
        },
      },
      include: {
        images: true,
        owner: true,
        review: {
          include: {
            users: true,
          },
        },
        discus: {
          include: {
            Users: true,
            discusType: true,
            reply: {
              include: {
                Users: true,
              },
            },
          },
        },
      },
    });
  
    return dto.toProductResponse(result);
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
        category: createRequest.category,
        condition: createRequest.condition
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
  static uploadProductImages(updatedUrls: UploadedFile[]): string[] | PromiseLike<string[]> {
    throw new Error('Method not implemented.');
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
