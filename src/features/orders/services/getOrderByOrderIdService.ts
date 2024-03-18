import prisma from "../../../libs/prisma";

export const getOrderByOrderIdService = async (orderId: string) => {
    try {
        const result = await prisma.orders.findUnique({
            where: {
                orderId: orderId,
            },
            include: {
                user: true,
                items: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};