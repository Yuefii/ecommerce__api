import { createReviewController } from "./reviews/createReviewController";
import { deleteReviewController } from "./reviews/deleteReviewController";
import { getReviewByIdController } from "./reviews/getReviewByProductIdController";
import { updateReviewController } from "./reviews/updateReviewController";

export const reviews = {
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController
}