import prisma from '../../../libs/prisma'

export const updateProductService = async (
  productId: string,
  userId: string,
  productData: {
    nama: string
    description: string
    price: number
    brand: string
    category: string
    quantity: number
    images: []
  }
) => {
  const { nama, description, price, brand, category, quantity, images } =
    productData
  const result = await prisma.products.update({
    where: {
      productId: productId
    },
    data: {
      nama,
      description,
      price,
      brand,
      category,
      ownerId: userId,
      quantity,
      images: {
        deleteMany: {},
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
