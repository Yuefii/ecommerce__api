import prisma from "../../../libs/prisma";

export const deleteDiscusService = async (discusId: string) => {
    try {
        const result = await prisma.discus.delete({
            where: {
                discusId: discusId,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};