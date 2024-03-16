import prisma from "../../lib/prisma";

export const getCartByCartIdService = async (cartId: string) => {
    try {
        const result = await prisma.carts.findUnique({
            where: {
                cartId: cartId,
            },
            include: {
                product: true,
                user: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};