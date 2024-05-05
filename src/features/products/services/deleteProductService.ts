import prisma from '../../../libs/prisma'

export const deleteProductService = async (productId: string) => {
  await prisma.products.delete({
    where: {
      productId: productId
    }
  })
}
