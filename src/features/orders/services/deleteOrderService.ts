import prisma from "../../../libs/prisma";

export const deleteOrderService = async (orderId: string) => {
    try {
        await prisma.orders.delete({
            where: {
                orderId: orderId,
            },
        });
    } catch (error) {
        throw error;
    }
};