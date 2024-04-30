import { logger } from "../../../utils/winston";
import { HistoryDTO } from "../../../dto/HistoryDto";
import { Request, Response } from "express";
import { createHistoryService } from "../services/createHistoryService";

export const createHistoryController = async (req: Request, res: Response) => {
    const { userId } = req.params
    const historyData = req.body

    try {
        logger.info(`Received request to create history for userId ${userId}`);

        const result = await createHistoryService(userId, historyData)
        const response = HistoryDTO(result)

        logger.info(`Successfully created history for userId : ${userId}`);

        res.status(201).json({
            message: "successfully",
            data: response
        })
        
    } catch (error: any) {
        logger.error(`Error creating history for userId : ${userId}`, { error: error.message });
        res.status(404).json({
            statusCode: 404,
            error: "userId not found"
        });
    }
}