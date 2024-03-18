import prisma from "../../../libs/prisma";

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