import prisma from "../libs/prisma";

export const getTotalProducts = async () => {
    try {
        const totalProducts = await prisma.products.count();
        return totalProducts;
    } catch (error) {
        throw error;
    }
};