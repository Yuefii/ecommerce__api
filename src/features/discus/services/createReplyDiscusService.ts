import prisma from "../../../libs/prisma";

export const createReplyDiscusService = async (
    discusId: string,
    userId: string,
    replyData: {
        message: string
    }) => {
    try {
        const {
            message
        } = replyData;
        const result = await prisma.reply.create({
            data: {
                discusId,
                userId,
                message
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};