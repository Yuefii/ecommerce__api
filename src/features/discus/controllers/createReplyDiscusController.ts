import { Request, Response } from "express";
import { createReplyDiscusService } from "../services/createReplyDiscusService";

export const createReplyDiscusController = async (req: Request, res: Response) => {
    try {
        const { discusId, userId } = req.params;
        const replyData = req.body;
        const result = await createReplyDiscusService(discusId, userId, replyData);
        res.json({
            message: "successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            statusCode: 404,
            error: "discus id & user id not found"
        });
    }
};