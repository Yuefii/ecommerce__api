import prisma from "../../../libs/prisma";

export const updateCartService = async (cartId: string, productData: {
    quantity: number,
}) => {
    try {
        const {
            quantity,
        } = productData;
        const cart = await prisma.carts.findUnique({
            where: {
                cartId,
            },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const newQuantity = productData.quantity > 0 ?
            cart.quantity + productData.quantity :
            Math.max(0, cart.quantity + productData.quantity);

        const result = await prisma.carts.update({
            where: {
                cartId: cartId,
            },
            data: {
                quantity: newQuantity,
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