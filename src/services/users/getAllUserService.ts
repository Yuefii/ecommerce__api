import prisma from "../../lib/prisma";

export const getAllUsersService = async () => {
    try {
        const result = await prisma.users.findMany();
        return result;
    } catch (error) {
        throw error;
    }
};