import prisma from "../../../libs/prisma"

export const getHistoryByUserIdService = async (userId: string) => {
    try {
        const result = await prisma.history.findMany({
            where: {
                userId: userId
            },
            include: {
                users: true
            }
        })
        return result
    } catch (error) {
        throw error
    }
}