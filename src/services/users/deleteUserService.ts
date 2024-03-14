import prisma from "../../lib/prisma";

export const deleteUserService = async (userId: string) => {
    try {
        await prisma.users.delete({
            where: {
                userId: userId,
            },
        });
    } catch (error) {
        throw error;
    }
};