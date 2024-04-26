import prisma from "../../../libs/prisma";

export const createDiscusService = async (productId: string, discusData: {
    userId: string,
    message: string,
    discusType: [],
}) => {
    const { userId, message, discusType } = discusData;
    try {
        const result = await prisma.discus.create({
            data: {
                userId: userId,
                productId: productId,
                message,
                discusType: {
                    createMany: {
                        data: discusType
                    }
                },
            },
            include: {
                discusType: true,
                reply: true
            }
        });

        return result;
    } catch (error) {
        throw error
    }
};