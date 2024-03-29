import prisma from "../../../libs/prisma";

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
                },
                owner: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};