import prisma from "../../../libs/prisma";

export const getUserByUserIdService = async (userId: string) => {
    try {
        const result = await prisma.users.findUnique({
            where: {
                userId: userId,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};