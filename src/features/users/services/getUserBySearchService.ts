import prisma from "../../../libs/prisma"

export const getUserBySearchService = async (keyword: any, limit: number) => {
    try {
        const result = await prisma.users.findMany({
            where: {
                OR: [
                    {
                        nama: { contains: keyword }
                    }
                ]
            },
            take: limit
        })
        return result
    } catch (error) {
        throw error
    }
}