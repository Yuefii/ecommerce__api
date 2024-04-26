import { Request, Response } from "express"
import { getDiscusByProductIdService } from "../services/getDiscusByProductIdService"

export const getDiscusByProductIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId
        const result = await getDiscusByProductIdService(productId)
        const response = result.map((item => (
            {
                discus_id: item.discusId,
                user_id: item.userId,

                discus_message: item.message,
                discus_type: item.discusType.map((item) => ({
                    name: item.name
                })),
                discus_reply: item.reply.map((item) => ({
                    // discus_id: item.discusId,
                    reply_id: item.replyId,
                    user_id: item.userId,
                    reply_message: item.message,
                    created_at: item.createdAt
                })),
                created_at: item.createdAt
            }
        )))
        res.status(200).json({ data: response })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            statusCode: 404,
            error: "product not found"
        });
    }
}