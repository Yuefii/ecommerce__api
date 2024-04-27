import prisma from "../../../libs/prisma"

export const getDiscusByProductIdService = async (productId: string) => {
    try {
        const result = await prisma.discus.findMany({
            where: {
                productId: productId
            },
            include: {
                discusType: true,
                reply: true
            }
        })
        return result
    } catch (error) {
        throw error
    }
}