import { logger } from "../../../utils/winston";
import { DiscusDTO } from "../../../dto/DiscusDto";
import { Request, Response } from "express";
import { createDiscusService } from "../services/createDiscusService";

export const createDiscusController = async (req: Request, res: Response) => {
    const discusData = req.body;
    const { productId, userId } = req.params;

    try {
        logger.info(`Received request to create discus for productId : ${productId} & userId : ${userId}`);

        const result = await createDiscusService(productId, userId, discusData)
        const response = DiscusDTO(result)

        logger.info(`Successfully created discus for productId : ${productId} & userId : ${userId}`);

        res.json({
            message: "successfully",
            data: response
        });
    } catch (error: any) {
        logger.error(`Error creating discus for productId : ${productId} & userId : ${userId}`, { error: error.message });
        res.status(404).json({
            statusCode: 404,
            error: "productId & userId not found"
        });
    }
};
