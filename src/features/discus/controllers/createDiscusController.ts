import { Request, Response } from "express";
import { createDiscusService } from "../services/createDiscusService";

export const createDiscusController = async (req: Request, res: Response) => {
    const { productId, userId } = req.params;
    const discusData = req.body;

    try {
        const result = await createDiscusService(productId, userId, discusData)
        const response = {
            discus_id: result.discusId,
            user_id: result.userId,
            discus_message: result.message,
            discus_type: result.discusType.map((item) => ({
                name: item.name
            })),
            discus_reply: result.reply.map((item) => ({
                discus_id: item.discusId,
                reply_id: item.replyId,
                user_id: item.userId,
                reply_message: item.message,
                created_at: item.createdAt
            })),
            created_at: result.createdAt
        }
        res.json({
            message: "successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            statusCode: 404,
            error: "product id & user id not found"
        });
    }
};
