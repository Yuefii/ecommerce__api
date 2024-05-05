import prisma from '../../../libs/prisma'

export const updateProductService = async (
  productId: string,
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
      quantity,
      images: {
        deleteMany: {},
        createMany: {
          data: images
        }
      }
    },
    include: {
      images: true
    }
  })
  return result
}
