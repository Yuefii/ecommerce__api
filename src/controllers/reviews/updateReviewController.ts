import { Request, Response } from "express";
import { updateReviewService } from "../../services/reviews/updateReviewService";

export const updateReviewController = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.reviewId;
        const reviewData = req.body;
        const result = await updateReviewService(reviewId, reviewData);
        const response = {
            review_id: result.reviewId,
            product_id: result.productId,
            rating: result.rating,
            comment: result.comment,
            created_at: result.createdAt,
            user: {
                user_id: result.users.userId,
                name: result.users.nama,
                email: result.users.email
            }
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