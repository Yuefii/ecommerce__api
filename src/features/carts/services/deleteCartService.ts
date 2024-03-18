import prisma from "../../../libs/prisma";

export const deleteCartService = async (cartId: string) => {
    try {
        await prisma.carts.delete({
            where: {
                cartId: cartId,
            },
        });
    } catch (error) {
        throw error;
    }
};