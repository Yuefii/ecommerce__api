import prisma from "../../lib/prisma";

export const getAllProductService = async () => {
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
        });
        return result;
    } catch (error) {
        throw error;
    }
};