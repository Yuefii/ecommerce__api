import { Request, Response } from "express";
import { createReplyDiscusService } from "../services/createReplyDiscusService";

export const createReplyDiscusController = async (req: Request, res: Response) => {
    try {
        const discusId = req.params.discusId;
        const replyData = req.body;
        const result = await createReplyDiscusService(discusId, replyData);
        res.json({
            message: "successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};