import { Request, Response } from "express";
import { getAllOrderService } from "../../services/orders/getAllOrderService";

export const getAllOrderController = async (req: Request, res: Response) => {
    try {
        const result = await getAllOrderService();
        const response = result.map((item => {
            let totalPrice = 0;
            item.items.forEach(item => {
                totalPrice += item.quantity * item.price;
            });
            return {
                order_id: item.orderId,
                status: item.status,
                total_price: totalPrice,
                user: {
                    user_id: item.user.userId,
                    name: item.user.nama,
                    email: item.user.email,
                },
                items: item.items.map(item => ({
                    product_id: item.productId,
                    price: item.price,
                    quantity: item.quantity,
                    sub_total: item.subtotal
                })),
                created_at: item.createdAt,
                updated_at: item.updatedAt,
            }
        }))
        res.status(200).json({
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};