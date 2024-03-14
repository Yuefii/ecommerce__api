import prisma from "../../lib/prisma";

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
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};