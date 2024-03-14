import prisma from "../../lib/prisma";

export const getProductByIdService = async (productId: string) => {
    try {
        const result = await prisma.products.findUnique({
            where: {
                productId: productId,
            },
            include: {
                images: true,
                review: {
                    include: {
                        users: true
                    }
                }
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};