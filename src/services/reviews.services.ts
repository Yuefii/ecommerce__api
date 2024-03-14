import prisma from "../lib/prisma";

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

export const deleteReviewService = async (reviewId: string) => {
    try {
        const result = await prisma.reviews.delete({
            where: {
                reviewId: reviewId,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};