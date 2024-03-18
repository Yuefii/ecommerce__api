import { Request, Response } from "express";
import { updateOrderService } from "../services/updateOrderService";

export const updateOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        const productData = req.body;
        const result = await updateOrderService(orderId, productData);
        let totalPrice = 0;
        result.items.forEach(item => {
            totalPrice += item.quantity * item.price;
        });
        const response = {
            order_id: result.orderId,
            status: result.status,
            total_price: totalPrice,
            user: {
                user_id: result.user.userId,
                name: result.user.nama,
                email: result.user.email,
            },
            items: result.items.map(item => ({
                product_id: item.productId,
                price: item.price,
                quantity: item.quantity,
                sub_total: item.subtotal
            })),
            created_at: result.createdAt,
            updated_at: result.updatedAt,
        }
        res.json({
            message: "successfully",
            updated: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};