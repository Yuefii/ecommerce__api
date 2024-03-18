import { Request, Response } from "express";
import { deleteCartService } from "../services/deleteCartService";

export const deleteCartController = async (req: Request, res: Response) => {
    try {
        const cartId = req.params.cartId;
        await deleteCartService(cartId);
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};