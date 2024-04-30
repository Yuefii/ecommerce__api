import { logger } from "../../../utils/winston";
import { Request, Response } from "express";
import { deleteHistoryService } from "../services/deleteHistoryService";

export const deleteHistoryController = async (req: Request, res: Response) => {
    const { historyId } = req.params

    try {
        logger.info(`Received request to delete history for historyId : ${historyId}`);

        await deleteHistoryService(historyId)

        logger.info(`Successfully deleted history for historyId : ${historyId}`);
        
        res.status(200).json({
            message: "history deleted successfully"
        })
    } catch (error: any) {
        logger.error(`Error deleted history for historyId : ${historyId}`, { error: error.message });
        res.status(404).json({
            statusCode: 404,
            error: "historyId not found"
        });
    }
}