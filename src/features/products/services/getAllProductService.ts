import prisma from "../../../libs/prisma";

export const getAllProductService = async (offset: number, limit: number) => {
    try {
        const result = await prisma.products.findMany({
            include: {
                images: true,
                review: {
                    include: {
                        users: true
                    }
                },
            },
            skip: offset,
            take: limit
        });
        return result;
    } catch (error) {
        throw error;
    }
};