import { Request, Response } from "express";
import {
    createReviewService,
    deleteReviewService,
    getReviewByProductIdService,
    updateReviewService
} from "../services/reviews.services";

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

export const deleteReviewController = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.reviewId
        await deleteReviewService(reviewId)
        res.status(200).json({ message: 'review product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
