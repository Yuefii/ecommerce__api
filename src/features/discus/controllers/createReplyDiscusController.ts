import { logger } from "../../../utils/winston";
import { Request, Response } from "express";
import { createReplyDiscusService } from "../services/createReplyDiscusService";

export const createReplyDiscusController = async (req: Request, res: Response) => {
    const replyData = req.body;
    const { discusId, userId } = req.params;

    try {
        logger.info(`Received request to create discus reply for discusId : ${discusId} & userId : ${userId}`);

        const result = await createReplyDiscusService(discusId, userId, replyData);

        logger.info(`Successfully created discus reply for discusId : ${discusId} & userId : ${userId}`);
        res.json({
            message: "successfully",
            data: result
        });
    } catch (error: any) {
        logger.error(`Error creating discus reply for discusId : ${discusId} & userId : ${userId}`, { error: error.message });
        res.status(404).json({
            statusCode: 404,
            error: "discusId & userId not found"
        });
    }
};