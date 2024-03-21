import prisma from "../../../libs/prisma";

export const getAllUsersService = async () => {
    try {
        const result = await prisma.users.findMany({
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