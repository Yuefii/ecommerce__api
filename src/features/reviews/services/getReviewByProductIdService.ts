import prisma from "../../../libs/prisma";

export const getReviewByProductIdService = async (productId: string) => {
    try {
        const result = await prisma.reviews.findMany({
            where: {
                productId: productId,
            },
            include: {
                users: true,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};