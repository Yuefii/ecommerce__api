import { Request, Response } from "express";
import { deleteHistoryService } from "../services/deleteHistoryService";

export const deleteHistoryController = async (req: Request, res: Response) => {
    try {
        const historyId = req.params.historyId
        await deleteHistoryService(historyId)
        res.status(200).json({
            message: "history deleted successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}