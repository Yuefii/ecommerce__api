import { Request, Response } from "express"
import { getHistoryByUserIdService } from "../services/getHistoryByUserIdService"

export const getHistoryByHistoryIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const result = await getHistoryByUserIdService(userId)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}