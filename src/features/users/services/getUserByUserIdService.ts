import prisma from "../../../libs/prisma";

export const getUserByUserIdService = async (userId: string) => {
    try {
        const result = await prisma.users.findUnique({
            where: {
                userId: userId,
            },
            include: {
                products: true,
                review: {
                    include: {
                        product: true
                    }
                },
                cart: {
                    include: {
                        product: true
                    }
                },
                order: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};