import { Request, Response } from "express"
import { getDiscusByProductIdService } from "../services/getDiscusByProductIdService"
import { DiscusDTO } from "../../../dto/DiscusDto"

export const getDiscusByProductIdController = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const result = await getDiscusByProductIdService(productId)
        const response = result.map(DiscusDTO)
        res.status(200).json({ data: response })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            statusCode: 404,
            error: "product not found"
        });
    }
}