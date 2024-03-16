import { Request, Response } from "express";
import { getAllCartService } from "../../services/carts/getAllCartService";

export const getAllCartController = async (req: Request, res: Response) => {
    try {
        const result = await getAllCartService();
        const response = result.map(item => ({
            cart_id: item.cartId,
            product: {
                product_id: item.product.productId,
                name: item.product.nama,
                price: item.product.price,
                quantity: item.quantity,
                total_price: item.product.price * item.quantity
            },
            user: {
                user_id: item.user.userId,
                name: item.user.nama,
                email: item.user.email
            },
            created_at: item.createdAt,
            updated_at: item.updatedAt
        }));
        res.json({
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};