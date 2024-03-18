import prisma from "../../../libs/prisma";

export const createReviewService = async (productId: string, reviewData: {
    userId: string,
    rating: number,
    comment: string
}) => {
    const { userId, rating, comment } = reviewData;
    try {
        const result = await prisma.reviews.create({
            data: {
                userId: userId,
                productId: productId,
                rating,
                comment,
            },
            include: {
                users: true,
            },
        });

        return result;
    } catch (error) {
        throw error
    }
};