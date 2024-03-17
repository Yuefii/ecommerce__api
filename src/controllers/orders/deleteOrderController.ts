import { Request, Response } from "express";
import { deleteOrderService } from "../../services/orders/deleteOrderService";

export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        await deleteOrderService(orderId);
        res.json({ message: 'order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};