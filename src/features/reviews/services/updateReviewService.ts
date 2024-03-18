import prisma from "../../../libs/prisma";

export const updateReviewService = async (reviewId: string, reviewData: {
    comment: string
    rating: number
}) => {
    try {
        const {
            comment,
            rating
        } = reviewData;
        const result = await prisma.reviews.update({
            where: {
                reviewId: reviewId,
            },
            data: {
                comment,
                rating
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