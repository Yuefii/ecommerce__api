import prisma from "../../lib/prisma";

export const deleteProductService = async (productId: string) => {
    try {
        await prisma.products.delete({
            where: {
                productId: productId,
            },
        });
    } catch (error) {
        throw error;
    }
};