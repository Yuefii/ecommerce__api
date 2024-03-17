import prisma from "../../lib/prisma";

export const getAllOrderService = async () => {
    try {
        const result = await prisma.orders.findMany({
            include: {
                items: true,
                user: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};