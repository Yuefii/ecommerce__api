import prisma from "../../lib/prisma";

export const getTotalProducts = async () => {
    try {
        const totalProducts = await prisma.products.count();
        return totalProducts;
    } catch (error) {
        throw error;
    }
};