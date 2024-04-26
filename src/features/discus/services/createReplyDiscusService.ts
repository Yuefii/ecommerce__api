import prisma from "../../../libs/prisma";

export const createReplyDiscusService = async (discusId: string, replyData: {
    userId: string
    message: string
}) => {
    try {
        const {
            userId,
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