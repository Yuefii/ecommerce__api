import { Request, Response } from "express";
import { getReviewByProductIdService } from "../../services/reviews/getReviewByProductIdService";

export const getReviewByIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId
        const result = await getReviewByProductIdService(productId)
        res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};