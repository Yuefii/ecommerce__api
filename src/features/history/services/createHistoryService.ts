import prisma from "../../../libs/prisma"

export const createHistoryService = async (UserId: string, historyData: {
    title: string,
    category: string
}) => {
    const { title, category } = historyData
    try {
        const result = await prisma.history.create({
            data: {
                userId: UserId,
                title,
                category
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