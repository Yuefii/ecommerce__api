import { Request, Response } from "express";
import { createCartService } from "../services/createCartService";

export const createCartController = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const result = await createCartService(productData);
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
        res.status(200).json({
            message: "successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};