import { Request, Response } from "express";
import { getCartByCartIdService } from "../../services/carts/getCartByCartIdService";

export const getCartByCartIdController = async (req: Request, res: Response) => {
    try {
        const cartId = req.params.cartId;
        const result = await getCartByCartIdService(cartId);
        if (!result) {
            return res.status(404).json({ error: 'product not found' });
        }
        const response = {
            cart_id: result.cartId,
            product: {
                product_id: result.product.productId,
                name: result.product.nama,
                price: result.product.price,
                quantity: result.quantity,
                total_price: result.product.price * result.quantity
            },
            user: {
                user_id: result.user.userId,
                name: result.user.nama,
                email: result.user.email
            },
            created_at: result.createdAt,
            updated_at: result.updatedAt
        }
        res.json({ data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};