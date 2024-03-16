import prisma from "../../lib/prisma";

export const createCartService = async (productData: {
    userId: string,
    productId: string,
    quantity: number
}) => {
    try {
        const {
            userId,
            productId,
            quantity,
        } = productData;
        const existingCart = await prisma.carts.findFirst({
            where: {
                userId,
                productId
            }
        });

        if (existingCart) {
            const updatedCart = await prisma.carts.update({
                where: {
                    cartId: existingCart.cartId
                },
                data: {
                    quantity: existingCart.quantity + quantity
                },
                include: {
                    product: true,
                    user: true
                }
            });
            return updatedCart;
        } else {
            const result = await prisma.carts.create({
                data: {
                    userId,
                    productId,
                    quantity,
                },
                include: {
                    product: true,
                    user: true
                }
            });
            return result;
        }
    } catch (error) {
        throw error;
    }
};