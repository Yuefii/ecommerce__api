import { Request, Response } from "express";
import { createDiscusService } from "../services/createDiscusService";
import { DiscusDTO } from "../../../dto/DiscusDto";

export const createDiscusController = async (req: Request, res: Response) => {
    const { productId, userId } = req.params;
    const discusData = req.body;

    try {
        const result = await createDiscusService(productId, userId, discusData)
        const response = DiscusDTO(result)
        res.json({
            message: "successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            statusCode: 404,
            error: "product id & user id not found"
        });
    }
};
