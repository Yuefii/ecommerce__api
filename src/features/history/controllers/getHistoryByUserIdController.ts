import { logger } from "../../../utils/winston"
import { Request, Response } from "express"
import { getHistoryByUserIdService } from "../services/getHistoryByUserIdService"

export const getHistoryByHistoryIdController = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        logger.info(`Received request to get history for userId : ${userId}`);

        const result = await getHistoryByUserIdService(userId)

        logger.info(`Successfully get history for userId : ${userId}`);

        const response = result.map((item => (
            {
                history_id: item.historyId,
                title: item.title,
                category: item.category,
                user: {
                    user_history_id: item.users?.userId,
                    name: item.users?.nama,
                    email: item.users?.email
                }
            }
        )))
        res.status(200).json({ data: response })
    } catch (error: any) {
        logger.error(`Error creating history for userId : ${userId}`, { error: error.message });
        res.status(404).json({
            statusCode: 404,
            error: "userId not found"
        });
    }
}