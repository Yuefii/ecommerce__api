import { Request, Response } from "express";
import { createHistoryService } from "../services/createHistoryService";
import { HistoryDTO } from "../../../dto/HistoryDto";

export const createHistoryController = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const historyData = req.body

    try {
        const result = await createHistoryService(userId, historyData)
        const response = HistoryDTO(result)
        res.status(201).json({
            message: "successfully",
            data: response
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}