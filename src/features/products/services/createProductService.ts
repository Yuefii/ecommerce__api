import prisma from '../../../libs/prisma'

export const createProductService = async (productData: {
  nama: string
  description: string
  price: number
  brand: string
  category: string
  quantity: number
  ownerId: string
  images: []
}) => {
  const {
    nama,
    description,
    price,
    brand,
    category,
    quantity,
    ownerId,
    images
  } = productData
  const result = await prisma.products.create({
    data: {
      nama,
      description,
      price,
      brand,
      category,
      quantity,
      ownerId,
      images: {
        createMany: {
          data: images
        }
      }
    },
    include: {
      images: true,
      owner: true
    }
  })
  return result
}
