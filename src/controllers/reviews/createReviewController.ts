import { Request, Response } from "express";
import { createReviewService } from "../../services/reviews/createReviewService";

export const createReviewController = async (req: Request, res: Response) => {
    const productId: any = req.params.productId;
    const reviewData = req.body;

    try {
        const review = await createReviewService(productId, reviewData)
        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
