import { Request, Response } from "express";
import { updateReviewService } from "../../services/reviews/updateReviewService";

export const updateReviewController = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.reviewId;
        const reviewData = req.body;
        const result = await updateReviewService(reviewId, reviewData);
        res.json({
            message: "successfully",
            updated: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};