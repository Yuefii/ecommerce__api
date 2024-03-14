import { Request, Response } from "express";
import { deleteProductService } from "../../services/products/deleteProductService";

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        await deleteProductService(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};